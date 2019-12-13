
class DocumentationService {
  constructor() { }
  async getCategory(parentNode) {
    const attrNodes = await parentNode.getChildren('hasCategoryAttributes');

    const attrs = [];
    for (const attr of attrNodes) {
      const element = attr.getElement();
      attrs.push(
        element.then((loadedElement) => {
          return {
            element: loadedElement,
            nameCat: attr.info.name.get(),
            node: attr,
          };
        }),
      );
    }
    return Promise.all(attrs);
  }
  async getAttributesByCategory(parentNode, categoryName) {
    const cat = await this.getCategoryByName(parentNode, categoryName);
    const tab = [];
    for (let i = 0; i < cat.element.length; i += 1) {
      const element = cat.element[i];
      tab.push(element);
    }
    return tab;
  }
  async getCategoryByName(parentNode, categoryName) {
    // console.log(categoryName);
    const catArray = await this.getCategory(parentNode);
    for (let i = 0; i < catArray.length; i += 1) {
      const element = catArray[i];
      if (element.node.info.name.get() === categoryName) {
        return element;
      }
    }
  }

  async getAllAttributes(parentNode) {
    const promisArray = [];
    const categoryArray = await this.getCategory(parentNode);

    const arrayAttributes = [];

    for (let i = 0; i < categoryArray.length; i += 1) {
      const element = categoryArray[i];
      const tab = this.getAttributesByCategory(parentNode,
                                               element.node.info.name.get());
      promisArray.push(tab.then((res) => {
        arrayAttributes.push(...res);
      }));
    }
    await Promise.all(promisArray);
    return arrayAttributes;
  }

}

export const serviceDocumentation = new DocumentationService();
