export const shuffle = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        array.push(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
    return array;
}

export const removeLeadingZero = (num) => {
    if (typeof num === 'number' && num < 10) {
        return parseInt(num.toString().slice(1), 10);
    } else if (typeof num === 'string' && parseInt(num, 10) < 10) {
        return parseInt(num.slice(1), 10);
    }
    return num;
}

export const categories = [
    {
        "name": "TV et Cinéma",
        "slug": "tv_cinema",
        "emoji": "📺🎬"
    },
    {
        "name": "Art et Littérature",
        "slug": "art_litterature",
        "emoji": "🎨📚"
    },
    {
        "name": "Musique",
        "slug": "musique",
        "emoji": "🎵"
    },
    {
        "name": "Actualité Politique",
        "slug": "actu_politique",
        "emoji": "📰🏛️"
    },
    {
        "name": "Culture Générale",
        "slug": "culture_generale",
        "emoji": "🌍📖"
    },
    {
        "name": "Sport",
        "slug": "sport",
        "emoji": "⚽🏅"
    },
    {
        "name": "Jeux Vidéos",
        "slug": "jeux_videos",
        "emoji": "🎮"
    }
]

export const slugToNameCategory = slug => categories.find(cat => cat.slug === slug).name;