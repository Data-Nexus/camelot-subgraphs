import fs from "fs"
import path from "path"
import process from "process"
import yaml from "js-yaml"

const loadSubgraphConfig = () => {
  const subgraphPath = path.join(process.cwd(), 'subgraph.yaml')
  const subgraphConfig = fs.readFileSync(subgraphPath, 'utf8');
  const subgraphYaml = yaml.load(subgraphConfig) as any;
  return { subgraphYaml, subgraphPath }
}

const saveSubgraphConfig = (subgraphYaml, subgraphPath) => {
  const updatedSubgraph = yaml.dump(subgraphYaml);
  fs.writeFileSync(subgraphPath, updatedSubgraph, 'utf8');
}

export { loadSubgraphConfig, saveSubgraphConfig }
