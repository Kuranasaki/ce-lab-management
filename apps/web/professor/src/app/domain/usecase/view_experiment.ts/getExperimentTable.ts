import getAllExperiment from "../../../data/repositories/view_experiment/getAllExperiment";
import experimentTableMapper from "../../mapper/view_experiment/experimentTableMapper";

export default async function getExperimentTable() {
    const rawData = await getAllExperiment();
    const mappedData = await experimentTableMapper(rawData);
    return mappedData;
}
