#import greeting 
import greeting_ask as greeting
import unittest
import json


class GreetingTestCase(unittest.TestCase):

    def setUp(self):
        greeting.app.config['ASK_VERIFY_REQUESTS'] = False
        self.app = greeting.app.test_client()
        with open('event.json') as data_file:    
            self.jdata = json.load(data_file)

    def tearDown(self):
        pass

    def get_repsonse(self,jdata):
        r=self.app.post('/alexa_end_point', data=json.dumps(jdata), content_type='application/json')
        response = json.loads(r.data)
        return response

    def test_00_launch_intent(self):
        jdata = self.jdata.copy()
        jdata['request']['type'] = 'LaunchRequest'
        jdata['request']['intent'] = {}
        response = self.get_repsonse(jdata)
        self.check_valid_response(response,end_session=False)
        self.assertRegex(response['response']['outputSpeech']['ssml'],r'<speak>Welcome.*</speak>', 'Output speech text check')

   


    def check_valid_response(self,response,end_session=True):
        self.assertEqual(response['version'],'1.0',"Version check")
        self.assertEqual(response['response']['outputSpeech']['type'],'SSML',"SSML check")
        self.assertIsInstance(response['response'],dict)
        self.assertIsInstance(response['response']['outputSpeech'],dict)
        self.assertIsNotNone(response['response']['shouldEndSession'])
        self.assertRegex(response['response']['outputSpeech']['ssml'],r'^<speak>.*</speak>', 'speech text valid')
        if end_session:
            self.assertTrue(response['response']['shouldEndSession'])
            self.assertNotIn('reprompt', response['response'])
        else:
            self.assertFalse(response['response']['shouldEndSession'])
            self.assertIn('reprompt', response['response'])
            self.assertRegex(response['response']['reprompt']['outputSpeech']['ssml'],r'^<speak>.*</speak>', 'reprompt text valid')


if __name__ == '__main__':
    unittest.main()
