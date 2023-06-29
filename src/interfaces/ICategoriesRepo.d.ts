interface ICategoriesRepo {
    getCategories(): Promise<Categories[]>;
}
type Categories = {
    id: string;
    categoryName: string;
    categoryDescription: string;
    icon: string;
    imagePage: string;
    active: string
}