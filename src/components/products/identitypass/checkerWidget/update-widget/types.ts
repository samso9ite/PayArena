//  TYPE DEFINITIONS
export type verificationChannelObject = {
    name: string
    value: string
    enabled: boolean
}

export type verificationChannels = {
    ninCard: boolean
    ninSlip: boolean
    bvn: boolean
    votersCard: boolean
    VotersSlip: boolean
    passport: boolean
    phoneNumber: boolean
}

export type WidgetObjectType = {
    widgetName?: string
    organisation: string
    description: string
    countries?: string[]
    theme: string
    faceConfidence: string
    verification: verificationChannels
}

export type CurrentStateWidget = {
    created_at: Date
    created_by: string
    endpoints: any[]
    face_confidence: string
    id: string
    is_active: boolean
    name: string
    organisation: string
    subtitle: string
    theme_color: string
    updated_at: Date
}

export type UpdateWidgetProps = {
    currentState: any
    channels: any
}

export type CountryObj = {
    value: string
    label: string
}
