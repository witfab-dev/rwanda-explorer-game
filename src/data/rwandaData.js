export const provinceGeoData = {
  'kigali': {
    name: 'Kigali City',
    kinyarwandaName: 'Umujyi wa Kigali',
    code: 'RW-01',
    bounds: {
      north: -1.892,
      south: -1.996,
      east: 30.108,
      west: 30.015
    }
  },
  'south': {
    name: 'Southern Province',
    kinyarwandaName: 'Amajyepfo',
    code: 'RW-02',
    bounds: {
      north: -2.358,
      south: -2.838,
      east: 30.215,
      west: 29.252
    }
  },
  'west': {
    name: 'Western Province',
    kinyarwandaName: 'Iburengerazuba',
    code: 'RW-03',
    bounds: {
      north: -1.592,
      south: -2.552,
      east: 29.590,
      west: 28.861
    }
  },
  'north': {
    name: 'Northern Province',
    kinyarwandaName: 'Amajyaruguru',
    code: 'RW-04',
    bounds: {
      north: -1.389,
      south: -1.767,
      east: 29.853,
      west: 29.393
    }
  },
  'east': {
    name: 'Eastern Province',
    kinyarwandaName: 'Iburasirazuba',
    code: 'RW-05',
    bounds: {
      north: -1.648,
      south: -2.216,
      east: 30.745,
      west: 30.243
    }
  }
}

export const districtData = {
  kigali: {
    name: 'Kigali City',
    nickname: 'The Heart of Rwanda',
    description: 'Kigali is the vibrant capital and largest city of Rwanda, known for its exceptional cleanliness, safety, and modern infrastructure. Built across several hills, it serves as the economic and cultural hub of the nation.',
    facts: [
      'Kigali was founded in 1907 and became capital at independence in 1962',
      'The city is consistently ranked as Africa\'s cleanest and safest capital',
      'Kigali hosts the Kigali Genocide Memorial, a powerful site of remembrance and education',
      'The city has a thriving tech scene and is known as a hub for innovation in East Africa'
    ],
    attractions: [
      'Kigali Genocide Memorial',
      'Kimironko Market',
      'Inema Arts Center',
      'Mount Kigali',
      'Nyamirambo Walking Tour'
    ],
    quest: {
      title: 'Kigali City Navigator',
      description: 'Explore Kigali\'s transformation from a divided city to a model of urban development and reconciliation.',
      question: 'What is Kigali famously known for across Africa?',
      options: [
        'Being the largest city in East Africa',
        'Being one of the cleanest and safest cities',
        'Having the tallest building in Africa',
        'Being the oldest capital city'
      ],
      correct: 'Being one of the cleanest and safest cities',
      reward: 100
    }
  },
  north: {
    name: 'Northern Province',
    nickname: 'Land of Volcanoes',
    description: 'The Northern Province is dominated by the majestic Virunga Mountains, home to the famous mountain gorillas. This region offers breathtaking volcanic landscapes and unique wildlife experiences.',
    facts: [
      'Home to Volcanoes National Park, established in 1925 as Africa\'s first national park',
      'Dian Fossey established the Karisoke Research Center here in 1967',
      'The region contains five of the eight Virunga volcanoes',
      'Traditional Intore dance and Umuganura harvest festival originate from this region'
    ],
    attractions: [
      'Volcanoes National Park',
      'Gorilla Trekking',
      'Musanze Caves',
      'Twin Lakes Burera & Ruhondo',
      'Buhanga Eco-Park'
    ],
    quest: {
      title: 'Gorilla Guardian',
      description: 'Learn about mountain gorilla conservation and the remarkable legacy of primatologist Dian Fossey.',
      question: 'Which famous primatologist conducted groundbreaking gorilla research in Rwanda\'s Volcanoes National Park?',
      options: [
        'Jane Goodall',
        'Dian Fossey',
        'Biruté Galdikas',
        'Louis Leakey'
      ],
      correct: 'Dian Fossey',
      reward: 100
    }
  },
  east: {
    name: 'Eastern Province',
    nickname: 'Savanna Gateway',
    description: 'The Eastern Province features vast savanna landscapes and is home to Akagera National Park, Rwanda\'s only Big Five safari destination and a conservation success story.',
    facts: [
      'Akagera National Park is named after the Kagera River system',
      'Lions were successfully reintroduced to Akagera in 2015 after 20-year absence',
      'Black rhinos returned to the park in 2017 and 2019',
      'The region is known for its long-horned Inyambo cattle, historically owned by royalty'
    ],
    attractions: [
      'Akagera National Park',
      'Lake Ihema',
      'Game Drives & Boat Safaris',
      'Bird Watching (500+ species)',
      'Community Cultural Tours'
    ],
    quest: {
      title: 'Wildlife Explorer',
      description: 'Discover the incredible biodiversity and conservation success of Akagera National Park.',
      question: 'Which of the "Big Five" was reintroduced to Akagera National Park in 2015 after being locally extinct?',
      options: [
        'Elephants',
        'Rhinos',
        'Lions',
        'Leopards'
      ],
      correct: 'Lions',
      reward: 100
    }
  },
  south: {
    name: 'Southern Province',
    nickname: 'Cultural Heartland',
    description: 'The Southern Province is Rwanda\'s cultural and historical heart, home to the ancient Nyiginya Kingdom\'s heritage sites and the intellectual capital of Butare (Huye).',
    facts: [
      'Nyanza served as the royal capital of the Rwandan kingdom',
      'The King\'s Palace Museum features a reconstruction of the traditional royal residence',
      'The Ethnographic Museum in Huye is one of Africa\'s finest collections',
      'This region is renowned for skilled artisans, particularly potters and basket weavers'
    ],
    attractions: [
      'King\'s Palace Museum (Nyanza)',
      'Ethnographic Museum (Huye)',
      'Nyungwe National Park',
      'Murambi Genocide Memorial',
      'Artisan Villages'
    ],
    quest: {
      title: 'Royal Heritage',
      description: 'Uncover the rich history of Rwanda\'s ancient kingdom and enduring cultural traditions.',
      question: 'Which town served as the traditional capital of the ancient Rwandan kingdom under the Nyiginya dynasty?',
      options: [
        'Butare (Huye)',
        'Nyanza',
        'Gitarama (Muhanga)',
        'Cyangugu (Rusizi)'
      ],
      correct: 'Nyanza',
      reward: 100
    }
  },
  west: {
    name: 'Western Province',
    nickname: 'Lake & Forest Region',
    description: 'The Western Province borders scenic Lake Kivu and contains Nyungwe Forest, one of Africa\'s oldest rainforests with remarkable primate diversity including chimpanzees.',
    facts: [
      'Nyungwe Forest National Park protects one of Africa\'s oldest rainforests',
      'The forest is home to 13 primate species including chimpanzees and colobus monkeys',
      'Lake Kivu is one of Africa\'s Great Lakes and a source of methane gas for power generation',
      'The Congo-Nile Trail offers spectacular hiking along the lake shore'
    ],
    attractions: [
      'Nyungwe National Park',
      'Canopy Walkway (50m high)',
      'Lake Kivu Beaches',
      'Chimpanzee Tracking',
      'Tea Plantations',
      'Gisenyi (Rubavu)'
    ],
    quest: {
      title: 'Rainforest Ranger',
      description: 'Navigate through ancient forests and discover the unique wildlife of Nyungwe.',
      question: 'Nyungwe Forest National Park is famous for its canopy walkway and protects how many primate species?',
      options: [
        '5 species',
        '8 species',
        '13 species',
        '20 species'
      ],
      correct: '13 species',
      reward: 100
    }
  }
}