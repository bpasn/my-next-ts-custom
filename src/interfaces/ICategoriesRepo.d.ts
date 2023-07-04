interface ICategoriesRepo {
    getCategories(): Promise<IPayload>;
}
type Categories = {
    id: string;
    categoryName: string;
    categoryDescription: string;
    icon: string;
    imagePage: string;
    active: string
}