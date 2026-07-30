const SEED_TRAILS = [
    {
        id: '1',
        trailName: 'Mountain Peak Loop',
        location: 'Rocky Mountains',
        difficulty: 'Hard',
        distance: 12.5
    },
    {
        id: '2',
        trailName: 'Forest Path',
        location: 'Oregon Woods',
        difficulty: 'Easy',
        distance: 3.2
    },
    {
        id: '3',
        trailName: 'Riverside Trail',
        location: 'Colorado River Valley',
        difficulty: 'Moderate',
        distance: 7.8
    },
    {
        id: '4',
        trailName: 'Canyon Ridge',
        location: 'Arizona Desert',
        difficulty: 'Hard',
        distance: 15.0
    },
    {
        id: '5',
        trailName: 'Lakeside Loop',
        location: 'Minnesota Lakes',
        difficulty: 'Easy',
        distance: 2.5
    }
];

if (typeof window !== 'undefined') {
    window.SEED_TRAILS = SEED_TRAILS;
}
