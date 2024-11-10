import getExperiment from "../../../data/repositories/view_experiment_detail/getExperiment";
import experimentDetailMapper from "../../mapper/view_experiment_detail/experimentDetailMapper";

export default async function getExperimentDetail(id: string) {
    const rawData = await getExperiment(id);
    const mappedData = await experimentDetailMapper(rawData);
    return mappedData;
}
