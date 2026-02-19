import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const { region = 'all', season = 'all' } = req.query;
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();
    const allRoutes = await getAllRoutes();

    const routes = allRoutes.filter((route) => {
        const matchesRegion = region === 'all' || route.region === region;
        const matchesSeason = season === 'all' || route.bestSeason === season;
        return matchesRegion && matchesSeason;
    });

    res.render('routes/list', {
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: {
            region,
            season
        }
    });
};
