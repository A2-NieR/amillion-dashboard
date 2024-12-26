declare global {
  interface Guild {
    id: string;
    name: string;
    icon: string | null;
    banner: sting | null;
    owner: boolean;
    permissions: number;
    permissions_new: string;
    features: Array<string>;
  }
}

export {};
