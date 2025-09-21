import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  Droplets, 
  Flame, 
  Zap, 
  Home, 
  Umbrella, 
  Skull,
  AlertTriangle,
  Shield,
  Phone
} from 'lucide-react';

const Education = () => {
  const healthTopics = [
    {
      id: 'mold',
      title: 'Mold & Moisture',
      icon: Droplets,
      description: 'Understanding mold growth and health impacts',
      content: {
        risks: [
          'Respiratory problems and allergic reactions',
          'Asthma triggers and breathing difficulties',
          'Skin and eye irritation',
          'Toxic mold exposure (black mold)'
        ],
        prevention: [
          'Control moisture levels below 60% humidity',
          'Fix water leaks immediately',
          'Ensure proper ventilation',
          'Use dehumidifiers in damp areas'
        ],
        signs: [
          'Musty odors',
          'Visible mold growth',
          'Water stains or discoloration',
          'Peeling paint or wallpaper'
        ],
        action: [
          'Wear N95 masks during cleanup',
          'Use bleach solution (1:10 ratio)',
          'Remove contaminated materials',
          'Call professionals for large areas (>10 sq ft)'
        ]
      }
    },
    {
      id: 'water-quality',
      title: 'Water Quality',
      icon: Droplets,
      description: 'Safe water practices after disasters',
      content: {
        risks: [
          'Bacterial contamination (E. coli, Salmonella)',
          'Chemical pollutants',
          'Sewage contamination',
          'Heavy metals and toxins'
        ],
        prevention: [
          'Use bottled or boiled water for drinking',
          'Test well water after flooding',
          'Disinfect water systems',
          'Avoid contact with standing water'
        ],
        signs: [
          'Unusual taste, color, or odor',
          'Cloudiness or particles',
          'Gastrointestinal illness',
          'Skin irritation after contact'
        ],
        action: [
          'Boil water for 1 minute before use',
          'Use water purification tablets',
          'Contact local health department',
          'Have water professionally tested'
        ]
      }
    },
    {
      id: 'electrical',
      title: 'Electrical Hazards',
      icon: Zap,
      description: 'Electrical safety after damage',
      content: {
        risks: [
          'Electrocution and electrical shock',
          'Electrical fires',
          'Carbon monoxide from generators',
          'Arc flash injuries'
        ],
        prevention: [
          'Turn off main power if flooding occurs',
          'Keep generators outside and away from windows',
          'Use GFCI outlets in wet areas',
          'Never touch electrical equipment with wet hands'
        ],
        signs: [
          'Buzzing or crackling sounds',
          'Burning smell',
          'Sparks or arcing',
          'Warm outlets or switches'
        ],
        action: [
          'Call licensed electrician immediately',
          'Stay away from downed power lines',
          'Use flashlights instead of candles',
          'Never use water on electrical fires'
        ]
      }
    },
    {
      id: 'flooring',
      title: 'Flooring Issues',
      icon: Home,
      description: 'Flooring damage and health concerns',
      content: {
        risks: [
          'Slip and fall hazards',
          'Mold growth under flooring',
          'Asbestos in older flooring materials',
          'Chemical off-gassing from damaged materials'
        ],
        prevention: [
          'Remove wet flooring within 24-48 hours',
          'Clean and dry subfloors thoroughly',
          'Test for asbestos before removal',
          'Ensure proper ventilation during work'
        ],
        signs: [
          'Warping, buckling, or lifting',
          'Soft spots or spongy feel',
          'Discoloration or staining',
          'Persistent odors'
        ],
        action: [
          'Document damage with photos',
          'Remove furniture to prevent further damage',
          'Use fans and dehumidifiers',
          'Consult flooring professionals'
        ]
      }
    },
    {
      id: 'roofing',
      title: 'Roofing Problems',
      icon: Umbrella,
      description: 'Roof damage and safety',
      content: {
        risks: [
          'Falls from height',
          'Structural collapse',
          'Water intrusion leading to mold',
          'Hypothermia from exposure'
        ],
        prevention: [
          'Never walk on damaged roofs',
          'Use professional roofers',
          'Install temporary tarps safely',
          'Clear debris carefully'
        ],
        signs: [
          'Missing or damaged shingles',
          'Sagging rooflines',
          'Water stains on ceilings',
          'Daylight visible through roof'
        ],
        action: [
          'Secure temporary weatherproofing',
          'Document all damage',
          'Contact insurance company',
          'Get professional inspection'
        ]
      }
    },
    {
      id: 'chemical',
      title: 'Chemical Poisoning',
      icon: Skull,
      description: 'Chemical hazards and toxin exposure',
      content: {
        risks: [
          'Carbon monoxide poisoning',
          'Chemical burns and respiratory damage',
          'Lead and asbestos exposure',
          'Pesticide and fuel contamination'
        ],
        prevention: [
          'Ventilate areas with chemical odors',
          'Use proper personal protective equipment',
          'Store chemicals safely',
          'Install CO detectors'
        ],
        signs: [
          'Headaches, dizziness, nausea',
          'Difficulty breathing',
          'Skin or eye irritation',
          'Chemical odors'
        ],
        action: [
          'Move to fresh air immediately',
          'Call Poison Control: 1-800-222-1222',
          'Flush contaminated skin/eyes with water',
          'Seek immediate medical attention'
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Health & Safety Education</h1>
          <p className="text-muted-foreground">
            Learn about health risks and safety protocols for common disaster-related hazards
          </p>
        </div>

        <Alert className="border-destructive/20 bg-destructive/5">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Emergency:</strong> If you are experiencing a medical emergency or immediate danger, 
            call 911 immediately. This information is for educational purposes only.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="mold" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {healthTopics.map((topic) => (
              <TabsTrigger key={topic.id} value={topic.id} className="text-xs">
                <topic.icon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{topic.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {healthTopics.map((topic) => (
            <TabsContent key={topic.id} value={topic.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <topic.icon className="h-6 w-6" />
                    {topic.title}
                  </CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Health Risks */}
                    <Card className="border-destructive/20">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                          Health Risks
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {topic.content.risks.map((risk, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-destructive">•</span>
                              <span className="text-sm">{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Prevention */}
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          Prevention
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {topic.content.prevention.map((prevention, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span className="text-sm">{prevention}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Warning Signs */}
                    <Card className="border-warning/20">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-warning" />
                          Warning Signs
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {topic.content.signs.map((sign, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-warning">•</span>
                              <span className="text-sm">{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Action Steps */}
                    <Card className="border-success/20">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Shield className="h-5 w-5 text-success" />
                          Action Steps
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {topic.content.action.map((action, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-success">•</span>
                              <span className="text-sm">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Emergency Contacts */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Phone className="h-5 w-5" />
              Important Emergency Numbers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="font-semibold text-destructive">Emergency Services</p>
                <p className="text-2xl font-bold">911</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="font-semibold">Poison Control</p>
                <p className="text-lg font-bold">1-800-222-1222</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="font-semibold">DFS Disaster Hotline</p>
                <p className="text-lg font-bold">1-800-339-1759</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="font-semibold">Gas Emergency</p>
                <p className="text-lg font-bold">1-800-427-2200</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="font-semibold">Electric Emergency</p>
                <p className="text-lg font-bold">1-800-611-1911</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FEMA Resources */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              Federal Resources & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">FEMA Disaster Assistance</h3>
              <p className="text-muted-foreground mb-4">
                Apply for federal disaster assistance if your area has been declared a disaster zone
              </p>
              <Button asChild className="w-full md:w-auto">
                <a href="https://www.disasterassistance.gov/" target="_blank" rel="noopener noreferrer">
                  Apply for FEMA Assistance
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Education;