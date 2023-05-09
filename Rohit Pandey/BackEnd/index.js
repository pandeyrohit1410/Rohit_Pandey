const express = require('express');
const app = express();
const cors = require('cors');
const Company = require('./database').Company;
const Ad = require('./database').Ad;

app.use(express.json());
app.use(cors());

app.get('/api/companies', async (req, res) => {
  const keyword = req.query.q;
  // console.log(keyword);
  try {
    const ads = await Ad.aggregate([{
        $match: {
          $or: [{
              primaryText: {
                $regex: keyword,
                $options: 'i'
              }
            },
            {
              headline: {
                $regex: keyword,
                $options: 'i'
              }
            },
            {
              description: {
                $regex: keyword,
                $options: 'i'
              }
            },
            {
              CTA: {
                $regex: keyword,
                $options: 'i'
              }
            }
          ]
        },
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: 'id',
          as: 'company'
        }
      },
      {
        $project: {
          _id: 0,
          id: 1,
          primaryText: 1,
          headline: 1,
          description: 1,
          CTA: 1,
          imageUrl: 1,
          company_name: {
            $arrayElemAt: ['$company.name', 0]
          },
          company_url: {
            $arrayElemAt: ['$company.url', 0]
          },
        }
      }
    ]);
    // console.log(ads);
    res.json(ads);
  } catch (err) {
    // console.error(err);
    res.status(500).send('Server error');
  }
});



app.get('/api/getall', async (req, res) => {
  try {
    const company = await Ad.find();
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(8080, () => console.log('Listening on port 8080...'));