module.exports = {
  development: {
    env: 'development',
    apiUrl: 'http://localhost:3000',
    firebase: {
      projectId: 'ai-agent-generator-a05b0',
      appId: '1:408498574443:web:4017ca6bb7f13c900bcd2e',
      measurementId: 'G-BLGHNQCDX7'
    }
  },
  production: {
    env: 'production',
    apiUrl: 'https://ai-agent-generator-a05b0.web.app',
    firebase: {
      projectId: 'ai-agent-generator-a05b0',
      appId: '1:408498574443:web:4017ca6bb7f13c900bcd2e',
      measurementId: 'G-BLGHNQCDX7'
    }
  }
}; 