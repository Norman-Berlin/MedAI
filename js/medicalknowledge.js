// ======================================================
// MEDAI MEDICAL KNOWLEDGE BASE
// Version 2 - Structured NLP Condition Matching
// ======================================================
//
// IMPORTANT:
// This knowledge base provides possible conditions only.
// It does NOT establish a medical diagnosis.
//
// Matching is based on patterns found in the information
// provided by the user.
//
// A real clinical diagnosis requires a qualified healthcare
// professional and, where appropriate, physical examination,
// medical history and medical testing.
// ======================================================


// ======================================================
// MEDICAL KNOWLEDGE BASE
// ======================================================

const medicalKnowledgeBase = {

    // ==================================================
    // HEADACHE CONDITIONS
    // ==================================================

    tensionHeadache: {

        name: "Tension-type headache",

        category: "Headache",

        description:
            "A common type of headache that may be associated with pressure, tightness, stress, or muscle tension around the head or neck.",

        symptoms: [
            "headache",
            "head pain"
        ],

        relatedSymptoms: [
            "fatigue",
            "neckPain",
            "bodyPain"
        ],

        bodyLocations: [
            "head",
            "neck"
        ],

        features: [
            "pressure",
            "tightness",
            "mild",
            "moderate"
        ],

        triggers: [
            "stress",
            "fatigue"
        ],

        guidance:
            "Rest, hydration, regular meals, and reducing activities that appear to trigger the headache may be helpful. Persistent, recurrent, or worsening headaches should be assessed by a healthcare professional.",

        urgency: "routine",

        source:
            "NHS headache guidance"

    },


    migraine: {

        name: "Migraine",

        category: "Headache",

        description:
            "A neurological condition that can cause moderate to severe headache and may occur with nausea or sensitivity to light or sound.",

        symptoms: [
            "headache",
            "nausea",
            "vomiting"
        ],

        relatedSymptoms: [
            "dizziness",
            "visionChanges"
        ],

        bodyLocations: [
            "head"
        ],

        features: [
            "throbbing",
            "moderate",
            "severe",
            "sensitivityToLight",
            "sensitivityToSound"
        ],

        triggers: [
            "stress",
            "lackOfSleep"
        ],

        guidance:
            "Resting in a quiet environment and maintaining hydration may be helpful. Recurrent or severe headaches should be assessed by a healthcare professional.",

        urgency: "routine",

        source:
            "NHS headache guidance"

    },


    // ==================================================
    // RESPIRATORY CONDITIONS
    // ==================================================

    commonCold: {

        name: "Common cold",

        category: "Respiratory",

        description:
            "A common viral respiratory illness that can cause cough, sore throat, runny nose, sneezing, and headache.",

        symptoms: [
            "cough",
            "soreThroat",
            "runnyNose",
            "blockedNose",
            "sneezing",
            "headache"
        ],

        relatedSymptoms: [
            "fatigue",
            "fever",
            "bodyPain"
        ],

        bodyLocations: [
            "throat",
            "head"
        ],

        features: [],

        triggers: [],

        guidance:
            "Rest, adequate fluids, and monitoring symptoms may be appropriate for mild respiratory symptoms. Seek professional medical advice if symptoms become severe or do not improve.",

        urgency: "routine",

        source:
            "MedlinePlus cold information"

    },


    influenza: {

        name: "Influenza (flu)",

        category: "Respiratory",

        description:
            "A viral respiratory infection that can cause fever, cough, headache, fatigue, sore throat, chills, and body aches.",

        symptoms: [
            "fever",
            "cough",
            "headache",
            "soreThroat",
            "fatigue",
            "bodyPain"
        ],

        relatedSymptoms: [
            "chills",
            "runnyNose",
            "nausea",
            "vomiting",
            "diarrhea"
        ],

        bodyLocations: [
            "head",
            "throat"
        ],

        features: [],

        triggers: [],

        guidance:
            "Rest, fluids, and monitoring symptoms can be appropriate for mild illness. Symptoms that become severe or involve breathing difficulty require professional medical attention.",

        urgency: "routine",

        source:
            "MedlinePlus influenza information"

    },


    asthmaPattern: {

        name: "Asthma-related symptoms",

        category: "Respiratory",

        description:
            "Asthma can cause episodes of coughing, wheezing, chest tightness, or difficulty breathing.",

        symptoms: [
            "cough",
            "wheezing",
            "shortnessOfBreath",
            "chestPain"
        ],

        relatedSymptoms: [
            "fatigue"
        ],

        bodyLocations: [
            "chest"
        ],

        features: [
            "chestTightness"
        ],

        triggers: [
            "exercise",
            "dust",
            "coldAir",
            "smoke"
        ],

        guidance:
            "Breathing symptoms should be assessed by a healthcare professional, especially if they are recurring. Significant or worsening difficulty breathing requires urgent medical attention.",

        urgency: "moderate",

        source:
            "General asthma symptom pattern"

    },


    // ==================================================
    // THROAT CONDITIONS
    // ==================================================

    viralSoreThroat: {

        name: "Viral throat infection",

        category: "Throat",

        description:
            "A sore throat is commonly caused by viral respiratory infections and may occur with cough, runny nose, or other cold-like symptoms.",

        symptoms: [
            "soreThroat",
            "throatPain"
        ],

        relatedSymptoms: [
            "cough",
            "runnyNose",
            "fever",
            "headache"
        ],

        bodyLocations: [
            "throat"
        ],

        features: [],

        triggers: [],

        guidance:
            "Fluids, rest, and monitoring symptoms may be appropriate for mild symptoms. Difficulty breathing or inability to swallow requires urgent medical assessment.",

        urgency: "routine",

        source:
            "NHS sore throat guidance"

    },


    // ==================================================
    // DIGESTIVE CONDITIONS
    // ==================================================

    gastroenteritis: {

        name: "Gastroenteritis",

        category: "Digestive",

        description:
            "An inflammation or infection affecting the stomach and intestines that may cause diarrhea, nausea, vomiting, abdominal pain, and sometimes fever.",

        symptoms: [
            "diarrhea",
            "nausea",
            "vomiting",
            "stomachPain",
            "abdominalPain",
            "fever"
        ],

        relatedSymptoms: [
            "weakness",
            "lossOfAppetite",
            "fatigue"
        ],

        bodyLocations: [
            "abdomen"
        ],

        features: [],

        triggers: [],

        guidance:
            "Maintaining fluid intake is important because diarrhea and vomiting can cause dehydration. Persistent symptoms, significant dehydration, blood in stool, or severe pain should be medically assessed.",

        urgency: "moderate",

        source:
            "MedlinePlus gastroenteritis information"

    },


    foodPoisoning: {

        name: "Possible foodborne illness",

        category: "Digestive",

        description:
            "Foodborne illness can cause gastrointestinal symptoms such as diarrhea, abdominal pain, nausea, and vomiting after consuming contaminated food or drink.",

        symptoms: [
            "diarrhea",
            "stomachPain",
            "abdominalPain",
            "nausea",
            "vomiting"
        ],

        relatedSymptoms: [
            "fever",
            "weakness",
            "fatigue"
        ],

        bodyLocations: [
            "abdomen"
        ],

        features: [],

        triggers: [
            "food",
            "eating"
        ],

        guidance:
            "Maintain adequate fluids and monitor symptoms. Blood in stool, severe abdominal pain, significant dehydration, or persistent symptoms should be assessed by a healthcare professional.",

        urgency: "moderate",

        source:
            "NHS diarrhea and vomiting guidance"

    },


    // ==================================================
    // GENERAL VIRAL INFECTION
    // ==================================================

    viralInfection: {

        name: "Possible viral infection",

        category: "Infection",

        description:
            "Several viral infections can cause combinations of fever, headache, cough, sore throat, fatigue, body aches, nausea, or diarrhea.",

        symptoms: [
            "fever",
            "headache",
            "cough",
            "soreThroat",
            "fatigue",
            "bodyPain"
        ],

        relatedSymptoms: [
            "nausea",
            "vomiting",
            "diarrhea",
            "runnyNose",
            "chills"
        ],

        bodyLocations: [
            "head",
            "throat"
        ],

        features: [],

        triggers: [],

        guidance:
            "Monitor symptoms, rest, and maintain adequate fluids. Worsening symptoms or warning signs should prompt professional medical assessment.",

        urgency: "routine",

        source:
            "General viral illness pattern"

    },


    // ==================================================
    // SKIN CONDITIONS
    // ==================================================

    skinFungalInfection: {

        name: "Possible superficial fungal skin infection",

        category: "Skin",

        description:
            "A superficial fungal skin infection can cause changes in skin appearance, itching, dryness, scaling, or a rash. Some fungal infections commonly affect warm or moist areas of the body.",

        symptoms: [
            "skinChanges",
            "skinScaling",
            "skinRash",
            "itching"
        ],

        relatedSymptoms: [
            "skinDryness",
            "skinRedness"
        ],

        bodyLocations: [
            "skin",
            "groin",
            "leg",
            "foot"
        ],

        features: [
            "scaling",
            "dryness",
            "itching",
            "rash"
        ],

        triggers: [
            "sweating",
            "moisture",
            "warmth"
        ],

        guidance:
            "Skin changes have several possible causes and cannot be identified reliably from symptoms alone. A healthcare professional or pharmacist can assess the affected area and recommend appropriate treatment. Avoid sharing personal towels or clothing and keep the area clean and dry.",

        urgency: "routine",

        source:
            "General dermatological symptom pattern"

    },


    contactDermatitis: {

        name: "Possible contact dermatitis",

        category: "Skin",

        description:
            "Contact dermatitis is a skin reaction that can occur after contact with an irritating or allergenic substance and may cause redness, itching, dryness, scaling, or a rash.",

        symptoms: [
            "skinRash",
            "skinRedness",
            "itching",
            "skinDryness"
        ],

        relatedSymptoms: [
            "skinScaling",
            "skinChanges"
        ],

        bodyLocations: [
            "skin",
            "groin",
            "leg",
            "hand",
            "arm"
        ],

        features: [
            "itching",
            "dryness",
            "scaling",
            "redness",
            "rash"
        ],

        triggers: [
            "soap",
            "detergent",
            "cosmetics",
            "chemical",
            "newProduct"
        ],

        guidance:
            "Consider whether the skin change appeared after contact with a new product, soap, detergent, fabric, or other substance. Avoiding a suspected irritant may help, but persistent or worsening skin changes should be assessed by a healthcare professional.",

        urgency: "routine",

        source:
            "General dermatological symptom pattern"

    },


    eczemaPattern: {

        name: "Possible eczema pattern",

        category: "Skin",

        description:
            "Eczema can cause dry, itchy, irritated, scaly, or inflamed skin. Symptoms can vary depending on the type of eczema and the area affected.",

        symptoms: [
            "skinDryness",
            "itching",
            "skinScaling",
            "skinChanges"
        ],

        relatedSymptoms: [
            "skinRash",
            "skinRedness"
        ],

        bodyLocations: [
            "skin",
            "leg",
            "arm",
            "hand"
        ],

        features: [
            "dryness",
            "itching",
            "scaling",
            "rash",
            "redness"
        ],

        triggers: [
            "dryAir",
            "soap",
            "detergent",
            "stress"
        ],

        guidance:
            "Moisturizing and avoiding products that appear to irritate the skin may help some people. Persistent, widespread, painful, infected-looking, or worsening skin changes should be assessed by a healthcare professional.",

        urgency: "routine",

        source:
            "General eczema symptom pattern"

    },


    // ==================================================
    // URINARY CONDITIONS
    // ==================================================

    urinaryTractPattern: {

        name: "Possible urinary tract infection",

        category: "Urinary",

        description:
            "A urinary tract infection can cause painful urination, frequent urination, and discomfort in the lower abdomen or urinary tract.",

        symptoms: [
            "painfulUrination",
            "frequentUrination"
        ],

        relatedSymptoms: [
            "abdominalPain",
            "fever",
            "weakness"
        ],

        bodyLocations: [
            "abdomen"
        ],

        features: [],

        triggers: [],

        guidance:
            "Urinary symptoms should be assessed by a healthcare professional because testing may be needed to determine the cause. Fever, worsening pain, or symptoms involving the back or side should receive prompt medical attention.",

        urgency: "moderate",

        source:
            "General urinary symptom pattern"

    },


    // ==================================================
    // MUSCULOSKELETAL CONDITIONS
    // ==================================================

    musclePainPattern: {

        name: "Possible muscle strain or muscle-related pain",

        category: "Musculoskeletal",

        description:
            "Muscle-related pain can occur after physical activity, repetitive movement, or strain and may cause localized discomfort or soreness.",

        symptoms: [
            "bodyPain",
            "backPain"
        ],

        relatedSymptoms: [
            "weakness",
            "fatigue"
        ],

        bodyLocations: [
            "back",
            "arm",
            "leg",
            "neck"
        ],

        features: [
            "soreness",
            "tightness"
        ],

        triggers: [
            "exercise",
            "lifting",
            "physicalActivity"
        ],

        guidance:
            "Resting from activities that worsen the discomfort may help mild muscle-related symptoms. Persistent, severe, or unexplained pain should be assessed by a healthcare professional.",

        urgency: "routine",

        source:
            "General musculoskeletal symptom pattern"

    }

};


// ======================================================
// SYMPTOM ALIASES
// ======================================================

const symptomAliases = {

    // Head
    "my head hurts": "headache",
    "head is hurting": "headache",
    "pain in my head": "headache",
    "head pain": "headache",
    "head ache": "headache",
    "aching head": "headache",

    // Fever
    "temperature": "fever",
    "high temperature": "fever",
    "feeling hot": "fever",
    "body is hot": "fever",

    // Respiratory
    "i am coughing": "cough",
    "been coughing": "cough",
    "coughing": "cough",

    "throat pain": "soreThroat",
    "painful throat": "soreThroat",
    "my throat hurts": "soreThroat",
    "throat hurts": "soreThroat",

    "runny nose": "runnyNose",
    "blocked nose": "blockedNose",

    // Digestive
    "stomach ache": "stomachPain",
    "stomach hurts": "stomachPain",
    "belly pain": "stomachPain",
    "pain in my stomach": "stomachPain",

    "pain in my abdomen": "abdominalPain",

    "loose stool": "diarrhea",
    "loose stools": "diarrhea",
    "watery stool": "diarrhea",
    "watery stools": "diarrhea",

    "feeling sick": "nausea",
    "feel sick": "nausea",
    "feeling like vomiting": "nausea",
    "feel like vomiting": "nausea",

    // Skin
    "dry skin": "skinDryness",
    "dry skin patches": "skinDryness",
    "scaly skin": "skinScaling",
    "scaly skin patches": "skinScaling",
    "skin is scaling": "skinScaling",
    "skin scales": "skinScaling",
    "skin rash": "skinRash",
    "skin irritation": "skinChanges",
    "skin problem": "skinChanges",
    "skin discoloration": "skinChanges",
    "dark skin": "skinChanges",
    "dark patch": "skinChanges",
    "dark patches": "skinChanges",

    // Urinary
    "pain when urinating": "painfulUrination",
    "pain when i urinate": "painfulUrination",
    "burning when urinating": "painfulUrination",
    "frequent urination": "frequentUrination",

    // Musculoskeletal
    "muscle pain": "bodyPain",
    "muscle ache": "bodyPain",
    "body aches": "bodyPain",
    "back ache": "backPain",
    "backache": "backPain"

};


// ======================================================
// NORMALIZE SYMPTOM
// ======================================================

function normalizeSymptom(text) {

    if (!text) {
        return "";
    }


    const normalized =
        String(text)
            .toLowerCase()
            .trim();


    return (
        symptomAliases[normalized] ||
        normalized
    );

}


// ======================================================
// NORMALIZE ARRAY
// ======================================================

function normalizeSymptomArray(
    symptoms
) {

    if (!Array.isArray(symptoms)) {
        return [];
    }


    return [
        ...new Set(
            symptoms
                .filter(Boolean)
                .map(
                    normalizeSymptom
                )
        )
    ];

}


// ======================================================
// FIND POSSIBLE CONDITIONS
// ======================================================
//
// This is the main upgraded matcher.
//
// Scoring:
//   Primary symptom  = +3
//   Related symptom  = +1
//   Body location    = +3
//   Feature          = +2
//   Trigger          = +1
//
// A condition must have a meaningful pattern match.
// Weak one-word matches are filtered out.
// ======================================================

function findPossibleConditions(
    medicalData
) {

    // --------------------------------------------------
    // Backward compatibility
    // --------------------------------------------------
    // Allows:
    // findPossibleConditions(["headache", "fever"])
    //
    // as well as:
    // findPossibleConditions(medicalData)

    if (Array.isArray(medicalData)) {

        medicalData = {

            symptoms:
                medicalData,

            bodyLocations: [],

            triggers: [],

            severity: null,

            duration: null,

            frequency: null,

            symptomDetails: []

        };

    }


    medicalData =
        medicalData || {};


    const userSymptoms =
        normalizeSymptomArray(
            medicalData.symptoms
        );


    const userLocations =
        uniqueNormalizedValues(
            medicalData.bodyLocations
        );


    const userTriggers =
        uniqueNormalizedValues(
            medicalData.triggers
        );


    const userFeatures =
        extractUserFeatures(
            medicalData
        );


    const results = [];


    // --------------------------------------------------
    // Check every condition
    // --------------------------------------------------

    for (
        const conditionKey
        in medicalKnowledgeBase
    ) {

        const condition =
            medicalKnowledgeBase[
                conditionKey
            ];


        let score = 0;


        const matchedSymptoms = [];

        const matchedRelatedSymptoms = [];

        const matchedLocations = [];

        const matchedFeatures = [];

        const matchedTriggers = [];


        // --------------------------------------------------
        // PRIMARY SYMPTOMS
        // --------------------------------------------------

        const conditionSymptoms =
            normalizeSymptomArray(
                condition.symptoms
            );


        conditionSymptoms.forEach(
            symptom => {

                if (
                    userSymptoms.includes(
                        symptom
                    )
                ) {

                    score += 3;

                    matchedSymptoms.push(
                        symptom
                    );

                }

            }
        );


        // --------------------------------------------------
        // RELATED SYMPTOMS
        // --------------------------------------------------

        const relatedSymptoms =
            normalizeSymptomArray(
                condition.relatedSymptoms
            );


        relatedSymptoms.forEach(
            symptom => {

                if (
                    userSymptoms.includes(
                        symptom
                    )
                ) {

                    score += 1;

                    matchedRelatedSymptoms.push(
                        symptom
                    );

                }

            }
        );


        // --------------------------------------------------
        // BODY LOCATION
        // --------------------------------------------------

        const conditionLocations =
            uniqueNormalizedValues(
                condition.bodyLocations
            );


        conditionLocations.forEach(
            location => {

                if (
                    userLocations.includes(
                        location
                    )
                ) {

                    score += 3;

                    matchedLocations.push(
                        location
                    );

                }

            }
        );


        // --------------------------------------------------
        // FEATURES
        // --------------------------------------------------

        const conditionFeatures =
            uniqueNormalizedValues(
                condition.features
            );


        conditionFeatures.forEach(
            feature => {

                if (
                    userFeatures.includes(
                        feature
                    )
                ) {

                    score += 2;

                    matchedFeatures.push(
                        feature
                    );

                }

            }
        );


        // --------------------------------------------------
        // TRIGGERS
        // --------------------------------------------------

        const conditionTriggers =
            uniqueNormalizedValues(
                condition.triggers
            );


        conditionTriggers.forEach(
            trigger => {

                if (
                    userTriggers.includes(
                        trigger
                    )
                ) {

                    score += 1;

                    matchedTriggers.push(
                        trigger
                    );

                }

            }
        );


        // --------------------------------------------------
        // NUMBER OF PRIMARY MATCHES
        // --------------------------------------------------

        const primaryMatchCount =
            matchedSymptoms.length;


        const locationMatch =
            matchedLocations.length > 0;


        // --------------------------------------------------
        // STRONG MATCH RULE
        // --------------------------------------------------
        //
        // We don't want:
        //
        // "headache"
        //
        // to automatically match every condition
        // containing the word headache.
        //
        // A meaningful match requires:
        //
        // 2+ primary symptoms
        //
        // OR
        //
        // 1 primary symptom + location
        //
        // OR
        //
        // 1 primary symptom + feature
        //
        // --------------------------------------------------

        const meaningfulMatch =
            primaryMatchCount >= 2 ||
            (
                primaryMatchCount >= 1 &&
                (
                    locationMatch ||
                    matchedFeatures.length >= 1
                )
            );


        if (!meaningfulMatch) {
            continue;
        }


        // --------------------------------------------------
        // NEGATED SYMPTOMS
        // --------------------------------------------------

        const negatedSymptoms =
            normalizeSymptomArray(
                medicalData.negatedSymptoms
            );


        // Don't award a condition based on symptoms
        // that the user explicitly denied.

        const hasNegatedPrimary =
            matchedSymptoms.some(
                symptom =>
                    negatedSymptoms.includes(
                        symptom
                    )
            );


        if (hasNegatedPrimary) {
            continue;
        }


        // --------------------------------------------------
        // ADD RESULT
        // --------------------------------------------------

        results.push({

            conditionKey,

            name:
                condition.name,

            category:
                condition.category,

            description:
                condition.description,

            guidance:
                condition.guidance,

            urgency:
                condition.urgency,

            score,

            matchedSymptoms:
                uniqueNormalizedValues(
                    matchedSymptoms
                ),

            matchedRelatedSymptoms:
                uniqueNormalizedValues(
                    matchedRelatedSymptoms
                ),

            matchedLocations:
                uniqueNormalizedValues(
                    matchedLocations
                ),

            matchedFeatures:
                uniqueNormalizedValues(
                    matchedFeatures
                ),

            matchedTriggers:
                uniqueNormalizedValues(
                    matchedTriggers
                ),

            source:
                condition.source

        });

    }


    // --------------------------------------------------
    // SORT
    // --------------------------------------------------

    results.sort(
        (a, b) => {

            if (
                b.score !== a.score
            ) {

                return (
                    b.score -
                    a.score
                );

            }


            return (
                b.matchedSymptoms.length -
                a.matchedSymptoms.length
            );

        }
    );


    // --------------------------------------------------
    // RETURN TOP RESULTS
    // --------------------------------------------------

    return results.slice(
        0,
        5
    );

}


// ======================================================
// EXTRACT USER FEATURES
// ======================================================
//
// Converts structured NLP information into features
// useful for condition matching.
// ======================================================

function extractUserFeatures(
    medicalData
) {

    const features = [];


    // --------------------------------------------------
    // Severity
    // --------------------------------------------------

    if (
        medicalData.severity
    ) {

        const severity =
            String(
                medicalData.severity
            )
                .toLowerCase();


        if (
            severity.includes(
                "mild"
            )
        ) {

            features.push(
                "mild"
            );

        }


        if (
            severity.includes(
                "moderate"
            )
        ) {

            features.push(
                "moderate"
            );

        }


        if (
            severity.includes(
                "severe"
            )
        ) {

            features.push(
                "severe"
            );

        }

    }


    // --------------------------------------------------
    // Symptom details
    // --------------------------------------------------

    if (
        Array.isArray(
            medicalData.symptomDetails
        )
    ) {

        medicalData.symptomDetails
            .forEach(
                detail => {

                    if (
                        typeof detail ===
                        "string"
                    ) {

                        features.push(
                            normalizeFeature(
                                detail
                            )
                        );

                    }

                }
            );

    }


    // --------------------------------------------------
    // Raw normalized text
    // --------------------------------------------------

    const text =
        (
            medicalData.normalizedText ||
            medicalData.rawText ||
            ""
        )
            .toLowerCase();


    // Skin features

    if (
        /\bdry\b|\bdryness\b/.test(
            text
        )
    ) {

        features.push(
            "dryness"
        );

    }


    if (
        /\bscale\b|\bscales\b|\bscaling\b|\bscaly\b/.test(
            text
        )
    ) {

        features.push(
            "scaling"
        );

    }


    if (
        /\bitch\b|\bitching\b|\bitchy\b/.test(
            text
        )
    ) {

        features.push(
            "itching"
        );

    }


    if (
        /\bred\b|\bredness\b/.test(
            text
        )
    ) {

        features.push(
            "redness"
        );

    }


    if (
        /\brash\b/.test(
            text
        )
    ) {

        features.push(
            "rash"
        );

    }


    if (
        /\btight\b|\btightness\b/.test(
            text
        )
    ) {

        features.push(
            "tightness"
        );

        features.push(
            "chestTightness"
        );

    }


    if (
        /\bthrobbing\b/.test(
            text
        )
    ) {

        features.push(
            "throbbing"
        );

    }


    if (
        /\bpressure\b/.test(
            text
        )
    ) {

        features.push(
            "pressure"
        );

    }


    if (
        /\bsensitivity to light\b/.test(
            text
        )
    ) {

        features.push(
            "sensitivityToLight"
        );

    }


    if (
        /\bsensitivity to sound\b/.test(
            text
        )
    ) {

        features.push(
            "sensitivityToSound"
        );

    }


    return [
        ...new Set(
            features.filter(Boolean)
        )
    ];

}


// ======================================================
// NORMALIZE FEATURE
// ======================================================

function normalizeFeature(
    value
) {

    return String(value)
        .toLowerCase()
        .trim()
        .replace(
            /\s+/g,
            " "
        );

}


// ======================================================
// NORMALIZE VALUES
// ======================================================

function uniqueNormalizedValues(
    values
) {

    if (!Array.isArray(values)) {
        return [];
    }


    return [
        ...new Set(
            values
                .filter(Boolean)
                .map(value =>
                    String(value)
                        .toLowerCase()
                        .trim()
                )
        )
    ];

}


// ======================================================
// GET CONDITION
// ======================================================

function getConditionByKey(
    conditionKey
) {

    return (
        medicalKnowledgeBase[
            conditionKey
        ] || null
    );

}


// ======================================================
// GET TOP POSSIBILITIES
// ======================================================

function getTopPossibleConditions(
    medicalData,
    limit = 3
) {

    const results =
        findPossibleConditions(
            medicalData
        );


    return results.slice(
        0,
        limit
    );

}


// ======================================================
// BUILD CONDITION RESPONSE DATA
// ======================================================
//
// This prepares information for chatbot.js.
// It does not say that the user has the condition.
// ======================================================

function buildPossibleConditionResponse(
    medicalData
) {

    const possibilities =
        getTopPossibleConditions(
            medicalData,
            3
        );


    if (
        possibilities.length === 0
    ) {

        return {

            found: false,

            message:
                "The information provided does not yet match a strong pattern in the current medical knowledge base.",

            possibilities: []

        };

    }


    return {

        found: true,

        message:
            "Based on the information provided, these are possible conditions to consider. This is not a diagnosis.",

        possibilities

    };

}


// ======================================================
// GLOBAL EXPORT
// ======================================================

window.MedAIKnowledge = {

    medicalKnowledgeBase,

    symptomAliases,

    normalizeSymptom,

    findPossibleConditions,

    getConditionByKey,

    getTopPossibleConditions,

    buildPossibleConditionResponse

};