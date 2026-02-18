const TRANSLATIONS = {
  en: {
    // App shell
    appName: 'Student Market',
    subtitle: 'Buy & sell in your student city.',

    // Auth
    selectUniversity: 'Select university',
    usernamePlaceholder: 'Username',
    passwordPlaceholder: 'Password',
    continue: 'Continue',
    fillAllFields: 'Please fill in all fields.',

    // Navbar / tabs
    browse: 'Browse',
    sell: 'Sell',
    logOut: 'Log out',
    switchLight: 'Switch to light mode',
    switchDark: 'Switch to dark mode',

    // Home filters
    allCategories: 'All categories',
    searchPlaceholder: 'Search listings...',

    // Home empty states
    emptyState: 'No listings yet. Be the first to sell something!',
    noResults: 'No listings match your search.',

    // Categories (used in filters and sell form)
    furniture: 'Furniture',
    electronics: 'Electronics',
    books: 'Books',
    other: 'Other',

    // Card actions
    delete: 'Delete',

    // Sell Item form
    newListing: 'New Listing',
    photoUrlLabel: 'Photo URL',
    photoPlaceholder: 'https://...',
    uploadFromDevice: 'Or upload from device',
    titleLabel: 'Title',
    titlePlaceholder: 'e.g. IKEA desk',
    priceLabel: 'Price in €',
    categoryLabel: 'Category',
    selectCategory: 'Select a category',
    descriptionLabel: 'Description',
    descPlaceholder: 'Describe the item...',
    postListing: 'Post listing',
    fillRequired: 'Please fill in all required fields.',

    // Product Detail
    backToListings: '← Back to listings',
    postedOn: 'Posted on',
    productNotFound: 'Product not found.',
    deleteListing: 'Delete listing',
  },

  fr: {
    // App shell
    appName: 'Marché Étudiant',
    subtitle: 'Achète & vends dans ta ville étudiante.',

    // Auth
    selectUniversity: 'Choisir une université',
    usernamePlaceholder: "Nom d'utilisateur",
    passwordPlaceholder: 'Mot de passe',
    continue: 'Continuer',
    fillAllFields: 'Veuillez remplir tous les champs.',

    // Navbar / tabs
    browse: 'Explorer',
    sell: 'Vendre',
    logOut: 'Déconnexion',
    switchLight: 'Passer en mode clair',
    switchDark: 'Passer en mode sombre',

    // Home filters
    allCategories: 'Toutes catégories',
    searchPlaceholder: 'Rechercher...',

    // Home empty states
    emptyState: "Aucune annonce pour l'instant. Soyez le premier à vendre !",
    noResults: 'Aucune annonce ne correspond à votre recherche.',

    // Categories
    furniture: 'Mobilier',
    electronics: 'Électronique',
    books: 'Livres',
    other: 'Autre',

    // Card actions
    delete: 'Supprimer',

    // Sell Item form
    newListing: 'Nouvelle annonce',
    photoUrlLabel: 'URL de la photo',
    photoPlaceholder: 'https://...',
    uploadFromDevice: "Ou télécharger depuis l'appareil",
    titleLabel: 'Titre',
    titlePlaceholder: 'ex. Bureau IKEA',
    priceLabel: 'Prix en €',
    categoryLabel: 'Catégorie',
    selectCategory: 'Choisir une catégorie',
    descriptionLabel: 'Description',
    descPlaceholder: "Décrivez l'objet...",
    postListing: "Publier l'annonce",
    fillRequired: 'Veuillez remplir tous les champs obligatoires.',

    // Product Detail
    backToListings: '← Retour aux annonces',
    postedOn: 'Publié le',
    productNotFound: 'Annonce introuvable.',
    deleteListing: "Supprimer l'annonce",
  },
};

// Maps English category values (stored in DB/localStorage) to translation keys
export const CATEGORY_KEYS = {
  All: 'allCategories',
  Furniture: 'furniture',
  Electronics: 'electronics',
  Books: 'books',
  Other: 'other',
};

export default TRANSLATIONS;
