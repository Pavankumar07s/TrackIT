export type RootStackParamList = {
    Manufacture: undefined;
    ManufacturerScreen: {
      manufacturerId: string;
    };
  };
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }