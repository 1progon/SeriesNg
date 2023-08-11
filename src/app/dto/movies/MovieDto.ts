import {BaseDto} from "../BaseDto";

export interface MovieDto extends BaseDto {
  mainImageThumb?: string;
  year: number;
  rating?: number;
  seasonsCount?: number;
  episodesCount?: number;
  commentsCount?: number;
}
