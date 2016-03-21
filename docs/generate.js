import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { parse } from 'react-docgen';
import glob from 'glob';


export default class GenerateMarkdown {
  constructor(filePath:string) {
    const baseName = path.basename(filePath);
    this.componentName = _.replace(baseName, /.js$/, '');
    this.inputPath = filePath.toString();
    this.outputPath = _.replace( _.replace(filePath, /^app\//, 'docs/'), /.js$/, '.md');

    this.file_source = fs.readFileSync(`${ process.cwd() }/${ this.inputPath }`);
    this.reactAPI = parse(this.file_source);
  }


  /**
   * Format the title value with markdown:
   *
   * Ex:      formatTitle("Title value", "=")
   * Returns: `Title value`
   *           ============
   *
   * @param value    Value to wrap in backticks(`)
   * @param divider  Divider for markdown ('=', '-')
   * @returns string Formatted title with the markdown underline
   */
  formatTitle(value, divider):string {
    return `\`${ value }\`\n${ _.repeat(divider, value.length+2) }\n`;
  }

  /**
   * Format the default value for a property
   * @param value
   * @returns {*}
   */
  formatDefaultProp(value) {
    return `defaultValue: \`${ value.value } \`\n`;
  }

  formatProps(props):string {
    const title = this.formatTitle('Props', '-');
    const values = _.keys(props).sort().map( (key) => {
      const value = props[key];
      return this.formatProp(key, value);
    });

    return _.flatten([title, '', values]).join('\n');
  }

  formatPropType(type):string {
    let formattedValue = null;
    if (_.isArray(type.value)) {
      formattedValue = `(${ type.value.map( (typeValue) => { return typeValue.name || typeValue.value; } ).join('|') })`;
    } else {
      formattedValue = type.value || '';
    }

    return `type: \`${ type.name } ${ formattedValue } \`\n`;
  }

  formatProp(propName, prop):string {
    const formattedName = `### \`${ propName } \` ${ prop.required ? ' (required)' : '' }`;
    const formattedDescription = prop.description || null;
    const formattedType = prop.type ? this.formatPropType(prop.type) : null;
    const formattedDefaultValue = prop.defaultValue ? this.formatDefaultProp(prop.defaultValue) : null;
    return _.compact(_.flatten([formattedName, '', formattedDescription, formattedType, formattedDefaultValue])).join("\n");
  }

  generateMarkdown():string {
    return `${ this.formatTitle(this.componentName, '=') }\n${ this.reactAPI.description }\n\n${ this.formatProps(this.reactAPI.props) }\n\n`;
  }

  writeMarkdown():void {
    fs.writeFileSync(`${ process.cwd() }/${ this.outputPath }`, this.generateMarkdown());
  }

}

const fileNames = glob.sync("app/components/form/*.js")
_.forEach(fileNames, (fileName) => {
  if (!_.endsWith(fileName, '.test.js')) {
    const input = new GenerateMarkdown(fileName);
    console.log(input.inputPath);
    input.writeMarkdown();
    console.log(input.outputPath);
  }
});



