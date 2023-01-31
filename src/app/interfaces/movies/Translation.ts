import {TranslationType} from "../../enums/movies/TranslationType";
import {BaseModel} from "../BaseModel";

export interface Translation extends BaseModel {
  kodikTranslationId: number;
  type: TranslationType;
}
