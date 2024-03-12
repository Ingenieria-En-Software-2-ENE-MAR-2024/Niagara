export function add_property(obj: any, property_name: string, value: any): void {
    obj[property_name] = value;
  
  }

  export function add_object_to_array<T>(array: T[], value_name: string, value: any): T[] {
    let new_object: { [key: string]: any } = {};
    new_object[value_name] = value;
  
    return [...array, new_object] as T[];
  }
  export function add_object_property<T>(input_object: T,value_name: string, value: any): T & { [key: string]: any } {
    const new_object = { ...input_object, [value_name]: value } as T & { [key: string]: any };
    return new_object;
  }