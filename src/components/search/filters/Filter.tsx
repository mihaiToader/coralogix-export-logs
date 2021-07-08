const FilterType = Object.freeze({
  EXACT: 'exact',
  RANGE: 'range',
  MATCH: 'match',
  EXCLUDE: 'exclude',
});

class Filter {
  name: string;

  type: string;

  value: any;

  label: any;

  constructor(name: string, type: string, value: any, label: string) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.label = label;
  }

  getValue() {
    return this.value;
  }

  setValue(value: any) {
    this.value = value;
  }

  getLabel(): any {
    return this.label;
  }

  setLabel(label: any) {
    this.label = label;
  }
}

export { FilterType };

export default Filter;
