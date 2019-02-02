
interface TorrentModel {

  name: string;
  progress: number;
  totalSize: string;
  sizeLeft: string;
  uploaded: string;
  hash: string;
  addedDate: Date;
  currentState: string;
  dl_speed: number;
  up_speed: number;
  num_seeds: number;
  num_complete: number;
  num_leechs: number;
  num_incomplete: number;
  ratio: number;
  eta: number;
}
