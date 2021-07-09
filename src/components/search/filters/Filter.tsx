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

  removable: boolean;

  constructor(
    name: string,
    type: string,
    value: any,
    label: string,
    removable = true
  ) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.label = label;
    this.removable = removable;
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
