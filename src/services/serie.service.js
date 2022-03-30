const serieSchema = require('../models/serie.model');
class SeriesService {
  async createSerie(serie) {
    serie.save();
    return serie;
  }

  async listSeries() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(serieSchema.find()), 3000);
    });
  }

  async showSerie(serieId) {
    return serieSchema.findById({ _id: serieId });
  }
  async editSerie(
    serieId,
    serie,
    number_seasons,
    original_lenguague,
    features_seasons
  ) {
      return serieSchema.updateOne(
        { _id: serieId },
        { serie, number_seasons, original_lenguague, features_seasons}
      );
    
  }

  async removeSerie(serieId) {
    const serieRemove = serieSchema.findById({ _id: serieId });
    return serieSchema.deleteOne(serieRemove);
  }

  async referenceActor(actor){
    const series = await serieSchema.find();
    const ciclo = [];

    series.forEach((serie,i) => {
      if(serie.features_seasons.cast.includes(actor)){
        ciclo[i] = serie
      }
    });

    return ciclo;

  }


  async referenceDate(date) {
    return serieSchema.find({ 'features_seasons.premier_date': date })
  }

}

module.exports = SeriesService;
