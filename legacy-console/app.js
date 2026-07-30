class TrailApp {
    constructor() {
        this.trails = [...SEED_TRAILS];
        this.filteredTrails = [...this.trails];
        this.editingId = null;
        this.debounceTimer = null;
        this.lastFocusedElement = null;

        this.elements = {
            trailList: document.getElementById('trailList'),
            searchInput: document.getElementById('searchInput'),
            addButton: document.getElementById('addButton'),
            formModal: document.getElementById('formModal'),
            trailForm: document.getElementById('trailForm'),
            modalTitle: document.getElementById('modalTitle'),
            trailName: document.getElementById('trailName'),
            location: document.getElementById('location'),
            difficulty: document.getElementById('difficulty'),
            distance: document.getElementById('distance'),
            modalClose: document.querySelectorAll('[data-role="modal-close"]')
        };

        this.init();
    }

    init() {
        this.attachEventHandlers();
        this.render();

        // this.attachListItemHandlers();
    }

    attachEventHandlers() {
        this.elements.addButton.addEventListener('click', () => this.openModal());
        this.elements.trailForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.elements.searchInput.addEventListener('input', (e) => this.handleSearch(e));

        this.elements.modalClose.forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        this.elements.formModal.addEventListener('keydown', (e) => this.handleModalKeydown(e));

        this.elements.trailList.addEventListener('click', (e) => {
            const editBtn = e.target.closest('[data-role="edit"]');
            const deleteBtn = e.target.closest('[data-role="delete"]');
            const item = e.target.closest('.trail-item');

            if (!item) return;

            const id = item.dataset.trailId;

            if (editBtn) {
                this.openModal(id);
            } else if (deleteBtn) {
                this.deleteTrail(id);
            }
        });
    }

    handleModalKeydown(event) {
        if (event.key === 'Escape') {
            this.closeModal();
            return;
        }

        if (event.key !== 'Tab') {
            return;
        }

        const focusable = this.elements.formModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) {
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }


    // attachListItemHandlers() {
    //     const items = this.elements.trailList.querySelectorAll('.trail-item');
    //     items.forEach(item => {
    //         const editBtn = item.querySelector('[data-role="edit"]');
    //         const deleteBtn = item.querySelector('[data-role="delete"]');

    //         if (editBtn) {
    //             editBtn.addEventListener('click', () => {
    //                 const id = item.dataset.trailId;
    //                 this.openModal(id);
    //             });
    //         }

    //         if (deleteBtn) {
    //             deleteBtn.addEventListener('click', () => {
    //                 const id = item.dataset.trailId;
    //                 this.deleteTrail(id);
    //             });
    //         }
    //     });
    // }

    handleSearch(event) {
        const term = event.target.value;

        // TODO: Debounce search input
        this.debounceTimer = setTimeout(() => {
            this.performSearch(term);
        }, 300);
    }

    performSearch(term) {
        // TODO: Filter results by name
        if (!term || term.trim() === '') {
            this.filteredTrails = this.trails;
        } else {
            this.filteredTrails = this.trails.filter(trail =>
                trail.trailName.toLowerCase().includes(term.trim().toLowerCase())
            );
        }

        this.render();
    }

    render() {
        if (this.filteredTrails.length === 0) {
            this.elements.trailList.innerHTML = '<div class="empty-state">No trails found</div>';
            return;
        }

        this.elements.trailList.innerHTML = this.filteredTrails
            .map(trail => this.renderTrailItem(trail))
            .join('');
    }

    renderTrailItem(trail) {
        return `
            <div class="trail-item" data-trail-id="${trail.id}">
                <div class="trail-header">
                    <div class="trail-name">${this.escapeHtml(trail.trailName)}</div>
                    <div class="trail-actions">
                        <button class="btn btn-secondary" data-role="edit">Edit</button>
                        <button class="btn btn-danger" data-role="delete">Delete</button>
                    </div>
                </div>
                <div class="trail-details">
                    <div class="detail-row">
                        <span class="detail-label">Location:</span>
                        <span class="detail-value">${this.escapeHtml(trail.location)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Difficulty:</span>
                        <span class="detail-value">${this.escapeHtml(trail.difficulty)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Distance:</span>
                        <span class="detail-value">${trail.distance} km</span>
                    </div>
                </div>
            </div>
        `;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, char => map[char]);
    }

    openModal(trailId = null) {
        this.editingId = trailId;

        if (trailId) {
            const trail = this.trails.find(t => t.id === trailId);
            if (trail) {
                this.elements.modalTitle.textContent = 'Edit Trail Record';
                this.elements.trailName.value = trail.trailName;
                this.elements.location.value = trail.location;
                this.elements.difficulty.value = trail.difficulty;
                this.elements.distance.value = trail.distance;
            }
        } else {
            this.elements.modalTitle.textContent = 'Add Trail Record';
            this.elements.trailName.value = '';
            this.elements.location.value = '';
            this.elements.difficulty.value = '';
            this.elements.distance.value = '';
        }

        this.lastFocusedElement = document.activeElement;
        this.elements.formModal.classList.remove('hidden');
        this.elements.trailName.focus();
    }

    closeModal() {
        this.elements.formModal.classList.add('hidden');
        this.editingId = null;

        if (this.lastFocusedElement) {
            this.lastFocusedElement.focus();
            this.lastFocusedElement = null;
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const formData = {
            trailName: this.elements.trailName.value,
            location: this.elements.location.value,
            difficulty: this.elements.difficulty.value,
            distance: parseFloat(this.elements.distance.value)
        };

        if (this.editingId) {
            const trail = this.trails.find(t => t.id === this.editingId);
            if (trail) {
                Object.assign(trail, formData);
            }
        } else {
            const newId = String(Math.max(...this.trails.map(t => parseInt(t.id)), 0) + 1);
            this.trails.push({
                id: newId,
                ...formData
            });
        }

        // TODO: Update view after form submission
        this.closeModal();
        this.filteredTrails = this.trails;
        this.render();
    }

    deleteTrail(trailId) {
        this.trails = this.trails.filter(t => t.id !== trailId);
        this.filteredTrails = this.filteredTrails.filter(t => t.id !== trailId);
        this.render();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TrailApp();
});

if (typeof window !== 'undefined') {
    window.TrailApp = TrailApp;
}
