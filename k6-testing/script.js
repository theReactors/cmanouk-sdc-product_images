import { Rate } from 'k6/metrics';
import http from 'k6/http';

let errorRate = new Rate('errorRate');

export let options = {
  discardResponseBodies: true,
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 500 },
    { duration: '30s', target: 750 },
    { duration: '30s', target: 1000 }
  ]
};

export default function() {
  let random = Math.floor(Math.random() * 8500000);
  let res = http.get(`http://50.18.22.30/listing/${random}`);
  // let res = http.get(`http://localhost:3000/listing/${random}`);

  errorRate.add(res.status >= 400);
};