export interface Category{
    ID: number;
    NAME: String;
    FATHER: number;
    CHILDREN?: Category[];
}