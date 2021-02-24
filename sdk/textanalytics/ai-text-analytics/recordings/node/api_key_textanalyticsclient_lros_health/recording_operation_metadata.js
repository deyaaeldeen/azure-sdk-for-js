let nock = require('nock');

module.exports.hash = "21ab4d653d6b5e3ee7c332593588cf4f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"2","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/1bf56537-74e3-416d-9c16-ddb00ee63b71',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'fe72fadc-c06d-4138-af97-8396a5e8e478',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/1bf56537-74e3-416d-9c16-ddb00ee63b71')
  .query(true)
  .reply(200, {"jobId":"1bf56537-74e3-416d-9c16-ddb00ee63b71","lastUpdateDateTime":"2021-02-23T19:35:44Z","createdDateTime":"2021-02-23T19:35:44Z","expirationDateTime":"2021-02-24T19:35:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'd20c482d-d113-4d6c-aeb6-2a6804bc7095',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/1bf56537-74e3-416d-9c16-ddb00ee63b71')
  .query(true)
  .reply(200, {"jobId":"1bf56537-74e3-416d-9c16-ddb00ee63b71","lastUpdateDateTime":"2021-02-23T19:35:44Z","createdDateTime":"2021-02-23T19:35:44Z","expirationDateTime":"2021-02-24T19:35:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e3a9581a-4174-42d6-8fb0-88b14eb55558',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/1bf56537-74e3-416d-9c16-ddb00ee63b71')
  .query(true)
  .reply(200, {"jobId":"1bf56537-74e3-416d-9c16-ddb00ee63b71","lastUpdateDateTime":"2021-02-23T19:35:46Z","createdDateTime":"2021-02-23T19:35:44Z","expirationDateTime":"2021-02-24T19:35:44Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":29,"length":19,"text":"high blood pressure","category":"Diagnosis","confidenceScore":1,"assertion":{"certainty":"negative"},"links":[{"dataSource":"UMLS","id":"C0020538"},{"dataSource":"AOD","id":"0000023317"},{"dataSource":"BI","id":"BI00001"},{"dataSource":"CCPSS","id":"1017493"},{"dataSource":"CCS","id":"7.1"},{"dataSource":"CHV","id":"0000015800"},{"dataSource":"COSTAR","id":"397"},{"dataSource":"CSP","id":"0571-5243"},{"dataSource":"CST","id":"HYPERTENS"},{"dataSource":"DXP","id":"U002034"},{"dataSource":"HPO","id":"HP:0000822"},{"dataSource":"ICD10","id":"I10-I15.9"},{"dataSource":"ICD10AM","id":"I10-I15.9"},{"dataSource":"ICD10CM","id":"I10"},{"dataSource":"ICD9CM","id":"997.91"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU035456"},{"dataSource":"ICPC2P","id":"K85004"},{"dataSource":"LCH","id":"U002317"},{"dataSource":"LCH_NW","id":"sh85063723"},{"dataSource":"LNC","id":"LA14293-7"},{"dataSource":"MDR","id":"10020772"},{"dataSource":"MEDCIN","id":"33288"},{"dataSource":"MEDLINEPLUS","id":"34"},{"dataSource":"MSH","id":"D006973"},{"dataSource":"MTH","id":"005"},{"dataSource":"MTHICD9","id":"997.91"},{"dataSource":"NANDA-I","id":"00905"},{"dataSource":"NCI","id":"C3117"},{"dataSource":"NCI_CPTAC","id":"C3117"},{"dataSource":"NCI_CTCAE","id":"E13785"},{"dataSource":"NCI_CTRP","id":"C3117"},{"dataSource":"NCI_FDA","id":"1908"},{"dataSource":"NCI_GDC","id":"C3117"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000458091"},{"dataSource":"NCI_NICHD","id":"C3117"},{"dataSource":"NOC","id":"060808"},{"dataSource":"OMIM","id":"MTHU002068"},{"dataSource":"PCDS","id":"PRB_11000.06"},{"dataSource":"PDQ","id":"CDR0000686951"},{"dataSource":"PSY","id":"23830"},{"dataSource":"RCD","id":"XE0Ub"},{"dataSource":"SNM","id":"F-70700"},{"dataSource":"SNMI","id":"D3-02000"},{"dataSource":"SNOMEDCT_US","id":"38341003"},{"dataSource":"WHO","id":"0210"}]}],"relations":[],"warnings":[]},{"id":"2","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":0.98},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1}],"relations":[{"relationType":"DosageOfMedication","entities":[{"ref":"#/results/documents/1/entities/0","role":"Attribute"},{"ref":"#/results/documents/1/entities/1","role":"Entity"}]},{"relationType":"FrequencyOfMedication","entities":[{"ref":"#/results/documents/1/entities/1","role":"Entity"},{"ref":"#/results/documents/1/entities/2","role":"Attribute"}]}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '96e7625c-5f39-41f5-bb80-431c640f8162',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:46 GMT'
]);
