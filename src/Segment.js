import axios from 'axios'

import Analytics from '@segment/analytics.js-core/lib/analytics'
import SegmentIntegration from '@segment/analytics.js-integration-segmentio'

// This asynchronously returns an initialized analytics.js instance that can send data to the given writeKey.
// It is dynamically configured with data from the Segment API for the given writeKey, though some settings have to
// still be set manually (e.g. metrics).
async function Segment(writeKey) {
    const settingsResponse = await axios.get(`https://cdn.segment.com/v1/projects/${writeKey}/settings`)
    const integrations = await axios.get(`https://cdn.segment.com/v1/projects/${writeKey}/integrations`)

    const enabledIntegrations = integrations.data.map( it => it.name )
    const trackingPlanSettings = settingsResponse.data.plan

    const integrationSettings = settingsResponse.data.integrations
    integrationSettings['Segment.io'].addBundledMetadata = true
    integrationSettings['Segment.io'].unbundledIntegrations = enabledIntegrations

    const analytics = new Analytics()
    analytics.use(SegmentIntegration)
    analytics.initialize(integrationSettings, {
        plan: trackingPlanSettings,
        metrics: { sampleRate : 0.1 },
    })
    return analytics
}

export default Segment;
