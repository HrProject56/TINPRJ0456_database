class Material {
    public id: number;
    public name: string;
    public created_at: number;
    public updated_at: number;

    constructor(id: number, name: string, created_at: number, updated_at: number) {
        this.id = id
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at
    }
}

export default Material;
