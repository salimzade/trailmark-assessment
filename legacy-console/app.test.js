// @vitest-environment jsdom

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let SEED_TRAILS;
let TrailApp;

beforeEach(() => {
    const seedDataPath = path.join(__dirname, 'seed-data.js');
    const appPath = path.join(__dirname, 'app.js');
    const htmlPath = path.join(__dirname, 'index.html');

    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    document.documentElement.innerHTML = htmlContent;

    const seedDataContent = fs.readFileSync(seedDataPath, 'utf-8');
    eval(seedDataContent);
    SEED_TRAILS = window.SEED_TRAILS;

    const appContent = fs.readFileSync(appPath, 'utf-8');
    eval(appContent);
    TrailApp = window.TrailApp;
});

afterEach(() => {
    document.documentElement.innerHTML = '';
});

describe('TrailApp - Event Handling', () => {
    it('should handle edit button click on initial render', () => {
        const app = new TrailApp();

        const editButton = document.querySelector('[data-role="edit"]');
        expect(editButton).toBeTruthy();

        editButton.click();
        const modal = document.getElementById('formModal');
        expect(modal.classList.contains('hidden')).toBe(false);
    });

    it('should handle delete button click on initial render', () => {
        const app = new TrailApp();
        const initialCount = app.trails.length;

        const deleteButton = document.querySelector('[data-role="delete"]');
        expect(deleteButton).toBeTruthy();

        deleteButton.click();
        expect(app.trails.length).toBe(initialCount - 1);
    });

    it('should handle delete after re-render cycle', () => {
        const app = new TrailApp();
        const initialCount = app.trails.length;

        app.render();
        const deleteButton = document.querySelector('[data-role="delete"]');
        deleteButton.click();
        expect(app.trails.length).toBe(initialCount - 1);
    });

    it('should handle edit after re-render', () => {
        const app = new TrailApp();

        app.render();
        const editButton = document.querySelector('[data-role="edit"]');
        expect(editButton).toBeTruthy();

        editButton.click();
        const modal = document.getElementById('formModal');
        expect(modal.classList.contains('hidden')).toBe(false);
    });
});

describe('TrailApp - Search and Filter', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('should filter trails by name', () => {
        const app = new TrailApp();
        const searchInput = document.getElementById('searchInput');

        searchInput.value = 'Mountain';
        searchInput.dispatchEvent(new Event('input'));

        vi.advanceTimersByTime(300);

        expect(app.filteredTrails.length).toBe(1);
        expect(app.filteredTrails[0].trailName).toBe('Mountain Peak Loop');
    });

    it('should show all trails when search is cleared', () => {
        const app = new TrailApp();
        const totalTrails = app.trails.length;
        const searchInput = document.getElementById('searchInput');

        searchInput.value = 'Forest';
        searchInput.dispatchEvent(new Event('input'));

        vi.advanceTimersByTime(300);
        expect(app.filteredTrails.length).toBe(1);

        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));

        vi.advanceTimersByTime(300);
        expect(app.filteredTrails.length).toBe(totalTrails);
    });

    it('should handle case-insensitive search', () => {
        const app = new TrailApp();
        const searchInput = document.getElementById('searchInput');

        searchInput.value = 'RIVER';
        searchInput.dispatchEvent(new Event('input'));

        vi.advanceTimersByTime(300);

        expect(app.filteredTrails.length).toBe(1);
        expect(app.filteredTrails[0].trailName).toBe('Riverside Trail');
    });

    it('should display empty state when no results match filter', () => {
        const app = new TrailApp();
        const searchInput = document.getElementById('searchInput');

        searchInput.value = 'NonexistentTrail12345';
        searchInput.dispatchEvent(new Event('input'));

        vi.advanceTimersByTime(300);

        const emptyState = document.querySelector('.empty-state');
        expect(emptyState).toBeTruthy();
        expect(emptyState.textContent).toContain('No trails found');
    });

    it('should not run more than one search pass for a rapid burst of keystrokes', () => {
        const app = new TrailApp();
        let callCount = 0;
        const originalPerformSearch = app.performSearch.bind(app);

        app.performSearch = function(term) {
            callCount++;
            originalPerformSearch(term);
        };

        const searchInput = document.getElementById('searchInput');

        searchInput.value = 'M';
        searchInput.dispatchEvent(new Event('input'));

        searchInput.value = 'Mo';
        searchInput.dispatchEvent(new Event('input'));

        searchInput.value = 'Mou';
        searchInput.dispatchEvent(new Event('input'));

        searchInput.value = 'Moun';
        searchInput.dispatchEvent(new Event('input'));

        vi.advanceTimersByTime(300);

        // A burst of keystrokes in quick succession should result in a single search pass.
        expect(callCount).toBeLessThanOrEqual(1);
    });

});

describe('TrailApp - Core Functionality', () => {
    it('should initialize with seed data', () => {
        const app = new TrailApp();
        expect(app.trails.length).toBeGreaterThan(0);
        expect(app.filteredTrails.length).toEqual(app.trails.length);
    });

    it('should render trails to the DOM', () => {
        const app = new TrailApp();
        const trailItems = document.querySelectorAll('.trail-item');
        expect(trailItems.length).toBe(app.trails.length);
    });

    it('should support adding a new trail', () => {
        const app = new TrailApp();
        const initialCount = app.trails.length;

        app.openModal();
        document.getElementById('trailName').value = 'New Trail';
        document.getElementById('location').value = 'New Location';
        document.getElementById('difficulty').value = 'Moderate';
        document.getElementById('distance').value = '10';

        const form = document.getElementById('trailForm');
        const submitEvent = new Event('submit');
        submitEvent.preventDefault = () => {};
        form.dispatchEvent(submitEvent);

        expect(app.trails.length).toBe(initialCount + 1);
    });

    it('should support editing an existing trail', () => {
        const app = new TrailApp();
        const originalTrail = app.trails[0];
        const originalName = originalTrail.trailName;

        app.openModal(originalTrail.id);
        document.getElementById('trailName').value = 'Updated Name';

        const form = document.getElementById('trailForm');
        const submitEvent = new Event('submit');
        submitEvent.preventDefault = () => {};
        form.dispatchEvent(submitEvent);

        const updated = app.trails.find(t => t.id === originalTrail.id);
        expect(updated.trailName).toBe('Updated Name');
        expect(updated.trailName).not.toBe(originalName);
    });

    it('should support deleting a trail', () => {
        const app = new TrailApp();
        const initialCount = app.trails.length;
        const firstTrailId = app.trails[0].id;

        app.deleteTrail(firstTrailId);

        expect(app.trails.length).toBe(initialCount - 1);
        expect(app.trails.find(t => t.id === firstTrailId)).toBeUndefined();
    });
});
