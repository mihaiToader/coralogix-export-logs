import Filter from './Filter';

class RangeFilter extends Filter {
  minValue: string;

  maxValue: string;

  label: string[];

  constructor(
    name: string,
    type: string,
    minValue: string,
    maxValue: string,
    label: string[],
    removable: boolean
  ) {
    super(name, type, [minValue, maxValue], '', removable);
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.label = label;
  }

  getValue() {
    return [this.minValue, this.maxValue];
  }

  setValue(value: any) {
    const [minValue, maxValue] = value;
    if (minValue) {
      this.minValue = minValue;
    }
    if (maxValue) {
      this.maxValue = maxValue;
    }
  }

  getLabel() {
    return this.label;
  }

  setLabel(label: string[]) {
    this.label = label;
  }
}

export default RangeFilter;
