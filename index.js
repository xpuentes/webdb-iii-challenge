const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile.js');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json({message: 'Error loading data.'});
    });
});

server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({id: id})
    .first()
    .then(cohorts => {
      if(cohorts){
        res.status(200).json(cohorts);
      } else {
        res.status(400).json({message: 'Cohort does not exist.'})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Error loading data'});
    });
});

server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .join('students', 'cohorts.id', 'students.cohort_id')
    .select('students.name as Student', 'cohorts.name as Cohort')
    .where('students.cohort_id', id)
    .then(cohorts => {
      if(cohorts){
        res.status(200).json(cohorts);
      } else {
        res.status(400).json({message: 'Cohort does not exist.'})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Error loading data'});
    });
});

server.post('/api/cohorts', (req, res) => {
  const name = req.body;

  db.insert(name)
    .into('cohorts')
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json({message: 'Unable to add new cohort.'});
    });
});

const port = process.env.PORT || 9090;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));
