// ============================================================
// MEDAI - MEDICAL NLP ENGINE
// medicalNLP.js
// ============================================================
//
// Purpose:
// Convert natural-language health messages into structured
// medical information that MedAI can understand.
//
// Example:
//
// "My head is pounding and I've been feeling sick since yesterday."
//
// becomes approximately:
//
// {
//   isMedical: true,
//   symptoms: ["headache", "nausea"],
//   duration: "since yesterday",
//   ...
// }
//
// IMPORTANT:
// This is a medical-language understanding layer.
// It does NOT diagnose diseases.
// ============================================================


// ============================================================
// 1. MEDICAL CONCEPT DATABASE
// ============================================================

const medicalConcepts = {

    // --------------------------------------------------------
    // GENERAL / PAIN
    // --------------------------------------------------------

    headache: {
        label: "Headache",
        category: "pain",
        synonyms: [
            "headache",
            "head pain",
            "pain in my head",
            "my head hurts",
            "head is hurting",
            "head is pounding",
            "pounding head",
            "head is throbbing",
            "throbbing head",
            "pressure in my head",
            "pressure in the head",
            "pain around my head"
        ]
    },

    migraine: {
        label: "Migraine-like headache",
        category: "pain",
        synonyms: [
            "migraine",
            "migraine headache",
            "severe throbbing headache",
            "pulsing headache"
        ]
    },

    bodyPain: {
        label: "Body pain",
        category: "pain",
        synonyms: [
            "body pain",
            "body aches",
            "body ache",
            "aching all over",
            "my whole body hurts",
            "pain all over",
            "muscle aches",
            "muscles are aching"
        ]
    },

    chestPain: {
        label: "Chest pain",
        category: "pain",
        synonyms: [
            "chest pain",
            "pain in my chest",
            "my chest hurts",
            "chest is hurting",
            "pressure in my chest",
            "tightness in my chest",
            "chest discomfort"
        ]
    },

    abdominalPain: {
        label: "Abdominal pain",
        category: "pain",
        synonyms: [
            "stomach pain",
            "stomach ache",
            "stomach hurts",
            "pain in my stomach",
            "abdominal pain",
            "pain in my abdomen",
            "belly pain",
            "belly ache",
            "lower abdominal pain",
            "upper abdominal pain"
        ]
    },

    backPain: {
        label: "Back pain",
        category: "pain",
        synonyms: [
            "back pain",
            "my back hurts",
            "pain in my back",
            "back is hurting",
            "lower back pain",
            "upper back pain"
        ]
    },

    jointPain: {
        label: "Joint pain",
        category: "pain",
        synonyms: [
            "joint pain",
            "pain in my joints",
            "joints hurt",
            "joint hurts",
            "painful joints",
            "aching joints"
        ]
    },


    // --------------------------------------------------------
    // FEVER / GENERAL
    // --------------------------------------------------------

    fever: {
        label: "Fever",
        category: "general",
        synonyms: [
            "fever",
            "high temperature",
            "temperature",
            "running a fever",
            "feeling feverish",
            "hot body",
            "body feels hot",
            "very hot",
            "burning up"
        ]
    },

    chills: {
        label: "Chills",
        category: "general",
        synonyms: [
            "chills",
            "shivering",
            "shivering a lot",
            "feeling cold",
            "cold chills",
            "body is shaking"
        ]
    },

    fatigue: {
        label: "Fatigue",
        category: "general",
        synonyms: [
            "fatigue",
            "very tired",
            "extremely tired",
            "always tired",
            "feeling tired",
            "no energy",
            "low energy",
            "weak and tired",
            "exhausted",
            "feeling exhausted"
        ]
    },

    weakness: {
        label: "Weakness",
        category: "general",
        synonyms: [
            "weakness",
            "feeling weak",
            "very weak",
            "weak all over",
            "my body feels weak",
            "loss of strength"
        ]
    },

    dizziness: {
        label: "Dizziness",
        category: "neurological",
        synonyms: [
            "dizzy",
            "dizziness",
            "feeling dizzy",
            "room is spinning",
            "everything is spinning",
            "lightheaded",
            "light headed",
            "feeling lightheaded",
            "about to faint"
        ]
    },


    // --------------------------------------------------------
    // RESPIRATORY
    // --------------------------------------------------------

    cough: {
        label: "Cough",
        category: "respiratory",
        synonyms: [
            "cough",
            "coughing",
            "keep coughing",
            "been coughing",
            "dry cough",
            "wet cough",
            "chesty cough"
        ]
    },

    shortnessOfBreath: {
        label: "Shortness of breath",
        category: "respiratory",
        synonyms: [
            "shortness of breath",
            "short of breath",
            "difficulty breathing",
            "hard to breathe",
            "can't breathe properly",
            "cannot breathe properly",
            "trouble breathing",
            "breathing difficulty",
            "breathlessness",
            "breathless"
        ]
    },

    wheezing: {
        label: "Wheezing",
        category: "respiratory",
        synonyms: [
            "wheezing",
            "wheeze",
            "whistling when breathing",
            "whistling sound when breathing"
        ]
    },

    soreThroat: {
        label: "Sore throat",
        category: "respiratory",
        synonyms: [
            "sore throat",
            "throat hurts",
            "throat pain",
            "painful throat",
            "my throat hurts",
            "difficulty swallowing because of throat pain"
        ]
    },

    runnyNose: {
        label: "Runny nose",
        category: "respiratory",
        synonyms: [
            "runny nose",
            "nose is running",
            "running nose",
            "watery nose",
            "fluid from my nose"
        ]
    },

    blockedNose: {
        label: "Blocked nose",
        category: "respiratory",
        synonyms: [
            "blocked nose",
            "stuffy nose",
            "nose is blocked",
            "can't breathe through my nose",
            "congested nose",
            "nasal congestion"
        ]
    },

    sneezing: {
        label: "Sneezing",
        category: "respiratory",
        synonyms: [
            "sneezing",
            "keep sneezing",
            "sneeze a lot",
            "sneezing frequently"
        ]
    },


    // --------------------------------------------------------
    // DIGESTIVE
    // --------------------------------------------------------

    nausea: {
        label: "Nausea",
        category: "digestive",
        synonyms: [
            "nausea",
            "feeling nauseous",
            "feel nauseous",
            "feel like vomiting",
            "feel like throwing up",
            "feel like I am going to throw up",
            "feel sick",
            "sick to my stomach",
            "queasy",
            "feeling queasy"
        ]
    },

    vomiting: {
        label: "Vomiting",
        category: "digestive",
        synonyms: [
            "vomiting",
            "vomited",
            "throwing up",
            "threw up",
            "been throwing up",
            "keeps vomiting"
        ]
    },

    diarrhea: {
        label: "Diarrhea",
        category: "digestive",
        synonyms: [
            "diarrhea",
            "diarrhoea",
            "loose stool",
            "loose stools",
            "watery stool",
            "watery stools",
            "frequent loose stool"
        ]
    },

    constipation: {
        label: "Constipation",
        category: "digestive",
        synonyms: [
            "constipation",
            "constipated",
            "difficulty passing stool",
            "hard stool",
            "can't poop",
            "cannot poop",
            "not passing stool"
        ]
    },

    bloating: {
        label: "Bloating",
        category: "digestive",
        synonyms: [
            "bloating",
            "bloated",
            "stomach feels bloated",
            "abdomen feels bloated",
            "swollen stomach"
        ]
    },

    lossOfAppetite: {
        label: "Loss of appetite",
        category: "digestive",
        synonyms: [
            "loss of appetite",
            "no appetite",
            "not hungry",
            "don't feel hungry",
            "do not feel hungry",
            "lost my appetite"
        ]
    },


    // --------------------------------------------------------
    // SKIN
    // --------------------------------------------------------

    skinChanges: {
        label: "Skin changes",
        category: "skin",
        synonyms: [
            "skin problem",
            "skin problems",
            "skin issue",
            "skin changes",
            "skin looks different",
            "change in my skin",
            "skin discoloration",
            "skin discolouration",
            "dark skin",
            "dark patch",
            "dark patches",
            "dark spot",
            "dark spots",
            "skin became dark",
            "skin is darker",
            "skin has become darker",
            "discolored skin",
            "discoloured skin"
        ]
    },

    itching: {
        label: "Itching",
        category: "skin",
        synonyms: [
            "itching",
            "itchy",
            "skin is itchy",
            "my skin itches",
            "keeps itching",
            "itchy skin"
        ]
    },

    skinDryness: {
        label: "Dry skin",
        category: "skin",
        synonyms: [
            "dry skin",
            "skin is dry",
            "my skin feels dry",
            "very dry skin",
            "skin keeps drying",
            "dry patch",
            "dry patches"
        ]
    },

    skinScaling: {
        label: "Skin scaling",
        category: "skin",
        synonyms: [
            "scaling",
            "skin scaling",
            "scaly skin",
            "skin is scaly",
            "skin flakes",
            "flaky skin",
            "skin is peeling",
            "peeling skin",
            "skin keeps peeling",
            "flakes of skin"
        ]
    },

    skinRash: {
        label: "Skin rash",
        category: "skin",
        synonyms: [
            "rash",
            "skin rash",
            "rash on my skin",
            "red rash",
            "spots on my skin",
            "skin spots",
            "bumps on my skin",
            "skin bumps"
        ]
    },

    skinRedness: {
        label: "Skin redness",
        category: "skin",
        synonyms: [
            "red skin",
            "skin is red",
            "red patch",
            "red patches",
            "redness",
            "skin redness",
            "inflamed skin"
        ]
    },

    swelling: {
        label: "Swelling",
        category: "general",
        synonyms: [
            "swelling",
            "swollen",
            "swollen area",
            "area is swollen",
            "puffy",
            "skin is swollen"
        ]
    },


    // --------------------------------------------------------
    // URINARY
    // --------------------------------------------------------

    painfulUrination: {
        label: "Painful urination",
        category: "urinary",
        synonyms: [
            "pain when urinating",
            "pain when peeing",
            "painful urination",
            "burning when urinating",
            "burning when peeing",
            "it hurts to pee",
            "urination is painful"
        ]
    },

    frequentUrination: {
        label: "Frequent urination",
        category: "urinary",
        synonyms: [
            "frequent urination",
            "peeing frequently",
            "urinating frequently",
            "keep needing to pee",
            "always need to pee",
            "peeing a lot"
        ]
    },

    bloodInUrine: {
        label: "Blood in urine",
        category: "urinary",
        synonyms: [
            "blood in my urine",
            "blood when I pee",
            "blood when urinating",
            "red urine",
            "urine looks bloody"
        ]
    },


    // --------------------------------------------------------
    // NEUROLOGICAL
    // --------------------------------------------------------

    numbness: {
        label: "Numbness",
        category: "neurological",
        synonyms: [
            "numbness",
            "numb",
            "feeling numb",
            "area feels numb",
            "my hand is numb",
            "my leg is numb"
        ]
    },

    tingling: {
        label: "Tingling",
        category: "neurological",
        synonyms: [
            "tingling",
            "pins and needles",
            "pins and needles feeling",
            "tingling sensation",
            "prickling sensation"
        ]
    },

    fainting: {
        label: "Fainting",
        category: "neurological",
        synonyms: [
            "fainted",
            "fainting",
            "passed out",
            "lost consciousness",
            "blacked out"
        ]
    },


    // --------------------------------------------------------
    // EYE
    // --------------------------------------------------------

    eyePain: {
        label: "Eye pain",
        category: "eye",
        synonyms: [
            "eye pain",
            "pain in my eye",
            "my eye hurts",
            "eyes hurt",
            "pain behind my eye"
        ]
    },

    blurredVision: {
        label: "Blurred vision",
        category: "eye",
        synonyms: [
            "blurred vision",
            "blurry vision",
            "vision is blurry",
            "can't see clearly",
            "cannot see clearly",
            "my sight is blurry"
        ]
    },

    eyeRedness: {
        label: "Eye redness",
        category: "eye",
        synonyms: [
            "red eye",
            "red eyes",
            "eye is red",
            "eyes are red",
            "redness in my eye"
        ]
    },


    // --------------------------------------------------------
    // DENTAL
    // --------------------------------------------------------

    toothPain: {
        label: "Tooth pain",
        category: "dental",
        synonyms: [
            "toothache",
            "tooth pain",
            "tooth hurts",
            "my tooth hurts",
            "pain in my tooth",
            "teeth hurt"
        ]
    }

};


// ============================================================
// 2. BODY LOCATION DATABASE
// ============================================================

const medicalBodyLocations = {

    head: [
        "head",
        "forehead",
        "temple",
        "temples",
        "back of my head"
    ],

    neck: [
        "neck",
        "back of my neck"
    ],

    chest: [
        "chest",
        "breastbone"
    ],

    abdomen: [
        "stomach",
        "abdomen",
        "belly",
        "tummy",
        "lower abdomen",
        "upper abdomen"
    ],

    back: [
        "back",
        "lower back",
        "upper back",
        "waist"
    ],

    arm: [
        "arm",
        "arms",
        "forearm",
        "upper arm",
        "elbow"
    ],

    hand: [
        "hand",
        "hands",
        "finger",
        "fingers",
        "thumb"
    ],

    leg: [
        "leg",
        "legs",
        "thigh",
        "calf",
        "knee",
        "knees"
    ],

    foot: [
        "foot",
        "feet",
        "ankle",
        "heel",
        "toe",
        "toes"
    ],

    groin: [
        "groin",
        "inner thigh",
        "between my legs",
        "upper inner thigh"
    ],

    genitalArea: [
        "genital area",
        "genitals",
        "genital region"
    ],

    skin: [
        "skin",
        "on my skin",
        "under my skin"
    ],

    eye: [
        "eye",
        "eyes"
    ],

    mouth: [
        "mouth",
        "lips",
        "gum",
        "gums",
        "tongue"
    ],

    throat: [
        "throat"
    ]
};


// ============================================================
// 3. MEDICAL CONDITION NAMES
// ============================================================
//
// Conditions mentioned by the user are NOT automatically
// treated as symptoms.
//
// Example:
//
// "I think I have diabetes."
//
// should become:
//
// conditionsMentioned: ["diabetes"]
//
// rather than:
//
// symptoms: ["diabetes"]
// ============================================================

const medicalConditions = {

    diabetes: [
        "diabetes",
        "diabetic"
    ],

    asthma: [
        "asthma",
        "asthmatic"
    ],

    malaria: [
        "malaria"
    ],

    pneumonia: [
        "pneumonia"
    ],

    flu: [
        "flu",
        "influenza"
    ],

    covid: [
        "covid",
        "covid-19",
        "coronavirus"
    ],

    eczema: [
        "eczema"
    ],

    psoriasis: [
        "psoriasis"
    ],

    hypertension: [
        "hypertension",
        "high blood pressure"
    ],

    gastritis: [
        "gastritis"
    ],

    ulcer: [
        "ulcer",
        "stomach ulcer"
    ]
};


// ============================================================
// 4. TEXT NORMALIZATION
// ============================================================

function normalizeMedicalText(text) {

    if (!text) {
        return "";
    }

    return text
        .toLowerCase()
        .replace(/[’']/g, "'")
        .replace(/[^\w\s'-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


// ============================================================
// 5. ESCAPE REGEX CHARACTERS
// ============================================================

function escapeRegex(text) {

    return text.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

}


// ============================================================
// 6. PHRASE MATCHING
// ============================================================

function phraseExists(text, phrase) {

    const cleanPhrase =
        normalizeMedicalText(phrase);

    if (!cleanPhrase) {
        return false;
    }

    const escaped =
        escapeRegex(cleanPhrase);

    const regex =
        new RegExp(
            `\\b${escaped}\\b`,
            "i"
        );

    return regex.test(text);

}


// ============================================================
// 7. DETECT SYMPTOMS
// ============================================================

function detectMedicalSymptoms(text) {

    const normalized =
        normalizeMedicalText(text);

    const detected = [];

    for (
        const symptomKey in medicalConcepts
    ) {

        const concept =
            medicalConcepts[symptomKey];

        let matchedPhrase = null;

        for (
            const synonym of concept.synonyms
        ) {

            if (
                phraseExists(
                    normalized,
                    synonym
                )
            ) {

                matchedPhrase = synonym;

                break;

            }

        }

        if (matchedPhrase) {

            detected.push({

                key: symptomKey,

                label: concept.label,

                category: concept.category,

                evidence: matchedPhrase,

                confidence:
                    calculateSymptomConfidence(
                        matchedPhrase,
                        concept
                    )

            });

        }

    }

    return removeDuplicateSymptoms(
        detected
    );

}


// ============================================================
// 8. CONFIDENCE CALCULATION
// ============================================================

function calculateSymptomConfidence(
    matchedPhrase,
    concept
) {

    let confidence = 0.70;

    // Exact medical term
    if (
        matchedPhrase ===
        concept.label.toLowerCase()
    ) {

        confidence = 0.95;

    }

    // Longer natural-language phrases
    else if (
        matchedPhrase.split(" ").length >= 4
    ) {

        confidence = 0.90;

    }

    else if (
        matchedPhrase.split(" ").length >= 2
    ) {

        confidence = 0.82;

    }

    return confidence;

}


// ============================================================
// 9. REMOVE DUPLICATE SYMPTOMS
// ============================================================

function removeDuplicateSymptoms(
    symptoms
) {

    const seen = new Set();

    return symptoms.filter(
        symptom => {

            if (
                seen.has(symptom.key)
            ) {

                return false;

            }

            seen.add(symptom.key);

            return true;

        }
    );

}


// ============================================================
// 10. DETECT BODY LOCATIONS
// ============================================================

function detectMedicalBodyLocations(text) {

    const normalized =
        normalizeMedicalText(text);

    const locations = [];

    for (
        const locationKey in medicalBodyLocations
    ) {

        const phrases =
            medicalBodyLocations[
                locationKey
            ];

        for (
            const phrase of phrases
        ) {

            if (
                phraseExists(
                    normalized,
                    phrase
                )
            ) {

                locations.push({

                    key: locationKey,

                    label:
                        formatLocationLabel(
                            locationKey
                        ),

                    evidence: phrase

                });

                break;

            }

        }

    }

    return locations;

}


// ============================================================
// 11. LOCATION LABEL
// ============================================================

function formatLocationLabel(
    locationKey
) {

    return locationKey
        .replace(
            /([A-Z])/g,
            " $1"
        )
        .replace(
            /^./,
            char => char.toUpperCase()
        );

}


// ============================================================
// 12. DETECT MEDICAL CONDITIONS MENTIONED
// ============================================================

function detectMentionedConditions(
    text
) {

    const normalized =
        normalizeMedicalText(text);

    const detected = [];

    for (
        const conditionKey in medicalConditions
    ) {

        const phrases =
            medicalConditions[
                conditionKey
            ];

        for (
            const phrase of phrases
        ) {

            if (
                phraseExists(
                    normalized,
                    phrase
                )
            ) {

                detected.push(
                    conditionKey
                );

                break;

            }

        }

    }

    return [
        ...new Set(detected)
    ];

}


// ============================================================
// 13. NEGATION DETECTION
// ============================================================
//
// Examples:
//
// "I have a cough but no fever."
//
// cough -> active
// fever -> negated
// ============================================================

function isNegated(
    text,
    phrase
) {

    const normalized =
        normalizeMedicalText(text);

    const index =
        normalized.indexOf(
            phrase.toLowerCase()
        );

    if (index === -1) {
        return false;
    }

    const before =
        normalized.substring(
            Math.max(0, index - 45),
            index
        );

    const negationWords = [

        "no",
        "not",
        "without",
        "don't have",
        "do not have",
        "doesn't have",
        "does not have",
        "never",
        "none"

    ];

    return negationWords.some(
        word =>
            before.includes(word)
    );

}


// ============================================================
// 14. DETECT NEGATED SYMPTOMS
// ============================================================

function detectNegatedSymptoms(
    text
) {

    const normalized =
        normalizeMedicalText(text);

    const negated = [];

    for (
        const symptomKey in medicalConcepts
    ) {

        const concept =
            medicalConcepts[symptomKey];

        for (
            const phrase of concept.synonyms
        ) {

            if (
                phraseExists(
                    normalized,
                    phrase
                ) &&
                isNegated(
                    normalized,
                    phrase
                )
            ) {

                negated.push(
                    symptomKey
                );

                break;

            }

        }

    }

    return [
        ...new Set(negated)
    ];

}


// ============================================================
// 15. DETECT UNCERTAIN SYMPTOMS
// ============================================================

function detectUncertainLanguage(
    text
) {

    const normalized =
        normalizeMedicalText(text);

    const uncertaintyWords = [

        "maybe",
        "might",
        "possibly",
        "perhaps",
        "i think",
        "i feel like",
        "could be",
        "not sure",
        "i'm not sure",
        "i am not sure"

    ];

    return uncertaintyWords.some(
        word =>
            normalized.includes(word)
    );

}


// ============================================================
// 16. DETECT DURATION
// ============================================================

function detectDuration(text) {

    const normalized =
        normalizeMedicalText(text);

    const patterns = [

        /\bfor\s+\d+\s+(minute|minutes|hour|hours|day|days|week|weeks|month|months|year|years)\b/i,

        /\bsince\s+(yesterday|today|last night|this morning|last week|last month)\b/i,

        /\bsince\s+\w+\b/i,

        /\b\d+\s+(minute|minutes|hour|hours|day|days|week|weeks|month|months|year|years)\s+ago\b/i,

        /\bfor\s+a\s+(few|couple of)\s+(days|weeks|months|hours)\b/i,

        /\bfor\s+several\s+(days|weeks|months|hours)\b/i,

        /\brecently\b/i,

        /\bfor\s+a\s+long\s+time\b/i

    ];

    for (
        const pattern of patterns
    ) {

        const match =
            normalized.match(pattern);

        if (match) {

            return match[0];

        }

    }

    return null;

}


// ============================================================
// 17. DETECT FREQUENCY
// ============================================================

function detectFrequency(text) {

    const normalized =
        normalizeMedicalText(text);

    const frequencyPatterns = [

        /\bevery\s+(day|morning|night|evening|week)\b/i,

        /\b\d+\s+times\s+a\s+(day|week|month)\b/i,

        /\bonce\s+a\s+(day|week|month)\b/i,

        /\btwice\s+a\s+(day|week|month)\b/i,

        /\boften\b/i,

        /\bfrequently\b/i,

        /\bsometimes\b/i,

        /\boccasionally\b/i,

        /\bconstantly\b/i,

        /\balways\b/i,

        /\bkeeps happening\b/i

    ];

    for (
        const pattern of frequencyPatterns
    ) {

        const match =
            normalized.match(pattern);

        if (match) {

            return match[0];

        }

    }

    return null;

}


// ============================================================
// 18. DETECT SEVERITY
// ============================================================

function detectSeverity(text) {

    const normalized =
        normalizeMedicalText(text);

    if (
        /\b(severe|extreme|excruciating|unbearable|very painful)\b/i
            .test(normalized)
    ) {

        return "severe";

    }

    if (
        /\b(moderate|quite painful|pretty painful)\b/i
            .test(normalized)
    ) {

        return "moderate";

    }

    if (
        /\b(mild|slight|slightly|a little|minor)\b/i
            .test(normalized)
    ) {

        return "mild";

    }

    return null;

}


// ============================================================
// 19. DETECT TRIGGERS
// ============================================================

function detectTriggers(text) {

    const normalized =
        normalizeMedicalText(text);

    const triggers = [];

    const triggerPatterns = [

        {
            key: "eating",
            phrases: [
                "after eating",
                "when i eat",
                "after meals",
                "after a meal"
            ]
        },

        {
            key: "exercise",
            phrases: [
                "after exercising",
                "during exercise",
                "when exercising",
                "after working out"
            ]
        },

        {
            key: "movement",
            phrases: [
                "when i move",
                "when moving",
                "movement makes it worse"
            ]
        },

        {
            key: "night",
            phrases: [
                "at night",
                "during the night",
                "when i sleep"
            ]
        },

        {
            key: "morning",
            phrases: [
                "in the morning",
                "every morning",
                "when i wake up"
            ]
        },

        {
            key: "cold",
            phrases: [
                "when it is cold",
                "cold weather",
                "in cold weather"
            ]
        },

        {
            key: "heat",
            phrases: [
                "when it is hot",
                "hot weather",
                "in hot weather"
            ]
        }

    ];

    triggerPatterns.forEach(
        trigger => {

            const found =
                trigger.phrases.some(
                    phrase =>
                        phraseExists(
                            normalized,
                            phrase
                        )
                );

            if (found) {

                triggers.push(
                    trigger.key
                );

            }

        }
    );

    return triggers;

}


// ============================================================
// 20. DETECT MEDICAL LANGUAGE
// ============================================================
//
// This prevents messages such as:
//
// "My skin keeps peeling."
//
// from being treated as an unknown/general message.
// ============================================================

function detectMedicalLanguage(
    text
) {

    const normalized =
        normalizeMedicalText(text);

    const medicalWords = [

        "pain",
        "painful",
        "symptom",
        "symptoms",
        "illness",
        "sick",
        "disease",
        "infection",
        "skin",
        "body",
        "health",
        "medical",
        "doctor",
        "medicine",
        "treatment",
        "fever",
        "cough",
        "breathing",
        "vomiting",
        "stool",
        "urine",
        "rash",
        "swelling",
        "itching",
        "bleeding",
        "wound",
        "injury",
        "hurt",
        "hurts",
        "hurting",
        "dizzy",
        "nauseous",
        "weak",
        "tired",
        "numb",
        "tingling"

    ];

    return medicalWords.some(
        word =>
            phraseExists(
                normalized,
                word
            )
    );

}


// ============================================================
// 21. DETECT HEALTH QUESTION
// ============================================================

function detectMedicalQuestion(
    text
) {

    const normalized =
        normalizeMedicalText(text);

    const questionPatterns = [

        "what could this be",
        "what is this",
        "what could be causing",
        "why is this happening",
        "is this normal",
        "should i be worried",
        "what should i do",
        "could this be",
        "what causes this",
        "is this a symptom",
        "what does this mean"

    ];

    return questionPatterns.some(
        phrase =>
            normalized.includes(phrase)
    );

}


// ============================================================
// 22. DETECT RED FLAGS
// ============================================================
//
// This is intentionally separate from diagnosis.
// It only identifies phrases that should trigger
// urgent-care guidance.
// ============================================================

function detectMedicalRedFlags(
    text
) {

    const normalized =
        normalizeMedicalText(text);

    const redFlags = [

        "difficulty breathing",
        "can't breathe",
        "cannot breathe",
        "severe chest pain",
        "chest pain",
        "passed out",
        "fainted",
        "loss of consciousness",
        "severe bleeding",
        "bleeding heavily",
        "sudden weakness",
        "sudden confusion",
        "unable to speak",
        "severe allergic reaction"

    ];

    return redFlags.filter(
        phrase =>
            phraseExists(
                normalized,
                phrase
            )
    );

}


// ============================================================
// 23. REMOVE NEGATED SYMPTOMS
// ============================================================

function filterActiveSymptoms(
    symptoms,
    negatedSymptoms
) {

    return symptoms.filter(
        symptom =>
            !negatedSymptoms.includes(
                symptom.key
            )
    );

}


// ============================================================
// 24. CALCULATE OVERALL CONFIDENCE
// ============================================================

function calculateOverallConfidence(
    symptoms,
    locations,
    medicalLanguage
) {

    let confidence = 0;

    if (symptoms.length > 0) {

        confidence += 0.55;

    }

    if (locations.length > 0) {

        confidence += 0.15;

    }

    if (medicalLanguage) {

        confidence += 0.20;

    }

    if (symptoms.length >= 2) {

        confidence += 0.10;

    }

    return Math.min(
        Number(confidence.toFixed(2)),
        1
    );

}


// ============================================================
// 25. MAIN NLP FUNCTION
// ============================================================

function analyzeMedicalMessage(
    message
) {

    const rawText =
        message || "";

    const normalizedText =
        normalizeMedicalText(
            rawText
        );

    const symptoms =
        detectMedicalSymptoms(
            normalizedText
        );

    const bodyLocations =
        detectMedicalBodyLocations(
            normalizedText
        );

    const conditionsMentioned =
        detectMentionedConditions(
            normalizedText
        );

    const negatedSymptoms =
        detectNegatedSymptoms(
            normalizedText
        );

    const uncertain =
        detectUncertainLanguage(
            normalizedText
        );

    const duration =
        detectDuration(
            normalizedText
        );

    const frequency =
        detectFrequency(
            normalizedText
        );

    const severity =
        detectSeverity(
            normalizedText
        );

    const triggers =
        detectTriggers(
            normalizedText
        );

    const medicalLanguage =
        detectMedicalLanguage(
            normalizedText
        );

    const medicalQuestion =
        detectMedicalQuestion(
            normalizedText
        );

    const redFlags =
        detectMedicalRedFlags(
            normalizedText
        );

    const activeSymptoms =
        filterActiveSymptoms(
            symptoms,
            negatedSymptoms
        );

    const isMedical =
        activeSymptoms.length > 0 ||
        conditionsMentioned.length > 0 ||
        medicalLanguage ||
        bodyLocations.length > 0 ||
        medicalQuestion;

    let intent =
        "unknown";

    if (
        activeSymptoms.length > 0
    ) {

        intent = "symptom_report";

    }

    else if (
        medicalQuestion
    ) {

        intent = "medical_question";

    }

    else if (
        conditionsMentioned.length > 0
    ) {

        intent = "condition_question";

    }

    else if (
        medicalLanguage
    ) {

        intent = "general_health";

    }

    return {

        isMedical,

        intent,

        rawText,

        normalizedText,

        symptoms:
            activeSymptoms.map(
                symptom =>
                    symptom.key
            ),

        symptomDetails:
            activeSymptoms,

        bodyLocations,

        conditionsMentioned,

        negatedSymptoms,

        uncertain,

        duration,

        frequency,

        severity,

        triggers,

        redFlags,

        confidence:
            calculateOverallConfidence(
                activeSymptoms,
                bodyLocations,
                medicalLanguage
            )

    };

}


// ============================================================
// 26. COMPATIBILITY FUNCTION
// ============================================================
//
// Your existing chatbot.js already expects:
//
// detectSymptoms(message)
//
// Therefore we keep this function so we don't have to
// completely rewrite the existing assessment engine.
// ============================================================

function detectSymptoms(message) {

    const result =
        analyzeMedicalMessage(
            message
        );

    return result.symptoms;

}


// ============================================================
// 27. EXPORT TO BROWSER
// ============================================================
//
// Because MedAI currently uses normal browser scripts,
// these functions are made globally available.
// ============================================================

window.MedAINLP = {

    analyzeMedicalMessage,

    detectSymptoms,

    detectMedicalSymptoms,

    detectMedicalBodyLocations,

    detectMentionedConditions,

    detectNegatedSymptoms,

    detectDuration,

    detectFrequency,

    detectSeverity,

    detectTriggers,

    detectMedicalRedFlags

};