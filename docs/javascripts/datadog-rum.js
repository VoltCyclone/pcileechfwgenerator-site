// Datadog RUM (Real User Monitoring) initialization
(function() {
  // Load Datadog RUM SDK
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js','DD_RUM')

  // Initialize Datadog RUM
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      applicationId: '3ef11764-1118-40da-83ea-09f81c465b66',
      clientToken: 'pub6238c735a8fff2e890c5cf0f4fbcf5f4',
      site: 'datadoghq.com',
      
      // Service and version tracking
      service: 'pcileechfwgenerator-docs',
      env: 'prd',
      // version: '1.0.0',
      
      // Session tracking configuration
      sessionSampleRate: 100,        // Track 100% of sessions
      sessionReplaySampleRate: 20,   // Record 20% of sessions
      trackUserInteractions: true,   // Track clicks, inputs, etc.
      trackResources: true,          // Track loading of resources
      trackLongTasks: true,          // Track performance bottlenecks
      
      // Default privacy settings
      defaultPrivacyLevel: 'mask-user-input',
      
      // Action naming for better analytics
      actionNameAttribute: 'data-dd-action-name',
      
      // Enable console error tracking
      forwardErrorsToLogs: true,
      forwardConsoleLogs: ['error', 'warn'],
      
      // Enable before send callback for custom data enrichment
      beforeSend: function(event) {
        // Add custom metadata
        if (event.type === 'view') {
          event.context = event.context || {};
          event.context.documentation_site = true;
        }
        return true;
      }
    });

    // Start session replay recording
    window.DD_RUM.startSessionReplayRecording();
  });
})();
