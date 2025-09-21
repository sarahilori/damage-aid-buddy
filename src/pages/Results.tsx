import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  DollarSign, 
  Phone, 
  Shield, 
  CheckCircle, 
  XCircle,
  Camera,
  Wrench
} from 'lucide-react';

interface Profile {
  name: string;
  address: string;
  budget: string;
}

interface AIAnalysis {
  type: string;
  severity: string;
  confidence: string;
}

interface HealthRisk {
  type: string;
  level: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
}

const Results = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);

  useEffect(() => {
    // Load stored data
    const storedProfile = localStorage.getItem('damageAidProfile');
    const storedPhotos = localStorage.getItem('damagePhotos');
    const storedAnalysis = localStorage.getItem('aiAnalysis');

    if (storedProfile) setProfile(JSON.parse(storedProfile));
    if (storedPhotos) setPhotos(JSON.parse(storedPhotos));
    if (storedAnalysis) setAnalysis(JSON.parse(storedAnalysis));
  }, []);

  const HEALTH_RISKS: Record<string, HealthRisk[]> = {
    'Water Damage': [
      {
        type: 'Hidden Mold Growth',
        level: 'high',
        description: 'AI detected potential mold growth in wall cavities and hidden areas, even if not visible in photos',
        recommendations: ['Immediate water extraction', 'Professional mold inspection with thermal imaging', 'Use dehumidifiers']
      },
      {
        type: 'Compromised Water Quality',
        level: 'high',
        description: 'Water contamination likely affecting drinking water supply',
        recommendations: ['Test water immediately', 'Use bottled water only', 'Professional water system inspection']
      },
      {
        type: 'Bacterial Contamination',
        level: 'medium',
        description: 'Potential bacterial growth in standing water',
        recommendations: ['Avoid direct contact', 'Use protective equipment', 'Professional testing']
      }
    ],
    'Flooding': [
      {
        type: 'Contaminated Floodwater',
        level: 'high',
        description: 'Floodwater contains dangerous bacteria, chemicals, and sewage that pose immediate health risks',
        recommendations: ['Evacuate if water is rising', 'Never walk through moving water', 'Avoid all contact with floodwater', 'Seek tetanus shot if exposed']
      },
      {
        type: 'Hidden Structural Damage',
        level: 'high',
        description: 'Flooding can weaken foundations and structural supports not visible from surface inspection',
        recommendations: ['Professional structural assessment', 'Avoid entering flooded buildings', 'Check foundation integrity']
      },
      {
        type: 'Electrical Hazards',
        level: 'high',
        description: 'Standing water combined with electrical systems creates electrocution risk',
        recommendations: ['Turn off power at main breaker if safe to do so', 'Never enter flooded areas with electricity on', 'Professional electrical inspection required']
      },
      {
        type: 'Mold and Air Quality',
        level: 'high',
        description: 'Rapid mold growth occurs within 24-48 hours after flooding, even in hidden areas',
        recommendations: ['Document all damage immediately', 'Begin water removal within 24 hours', 'Professional mold remediation', 'Use N95 masks']
      }
    ],
    'Fire Damage': [
      {
        type: 'Smoke Inhalation',
        level: 'high',
        description: 'Dangerous smoke particles and chemical residue',
        recommendations: ['Ventilate immediately', 'Wear N95 masks', 'Air quality testing']
      },
      {
        type: 'Toxic Chemicals',
        level: 'high',
        description: 'Burned materials may release harmful compounds',
        recommendations: ['Professional hazmat assessment', 'Evacuate if necessary', 'Use proper PPE']
      }
    ],
    'Structural Damage': [
      {
        type: 'Collapse Risk',
        level: 'high',
        description: 'Immediate physical danger from structural instability',
        recommendations: ['Evacuate immediately', 'Professional inspection', 'Secure perimeter']
      }
    ],
    'Roof Damage': [
      {
        type: 'Water Intrusion',
        level: 'medium',
        description: 'Ongoing water damage risk',
        recommendations: ['Temporary weatherproofing', 'Monitor for leaks', 'Professional repair']
      }
    ],
    'Electrical Damage': [
      {
        type: 'Electrocution Risk',
        level: 'high',
        description: 'Exposed electrical systems pose immediate danger',
        recommendations: ['Turn off main power', 'Professional electrical inspection', 'Avoid water contact']
      }
    ]
  };

  const COST_ESTIMATES: Record<string, { low: number; medium: number; high: number }> = {
    'Water Damage': { low: 2500, medium: 7500, high: 15000 },
    'Flooding': { low: 8000, medium: 25000, high: 85000 },
    'Fire Damage': { low: 5000, medium: 25000, high: 75000 },
    'Structural Damage': { low: 10000, medium: 35000, high: 100000 },
    'Roof Damage': { low: 3000, medium: 12000, high: 30000 },
    'Electrical Damage': { low: 1500, medium: 8000, high: 20000 }
  };

  const getEstimatedCost = () => {
    if (!analysis) return 0;
    const costs = COST_ESTIMATES[analysis.type] || { low: 1000, medium: 5000, high: 15000 };
    switch (analysis.severity) {
      case 'Minor': return costs.low;
      case 'Moderate': return costs.medium;
      case 'Severe': return costs.high;
      default: return costs.low;
    }
  };

  const getHealthRisks = () => {
    if (!analysis) return [];
    return HEALTH_RISKS[analysis.type] || [];
  };

  const getRiskLevel = () => {
    const risks = getHealthRisks();
    return risks.reduce((highest, risk) => {
      if (risk.level === 'high') return 'high';
      if (risk.level === 'medium' && highest !== 'high') return 'medium';
      return highest;
    }, 'low' as 'low' | 'medium' | 'high');
  };

  const getBudgetMatch = () => {
    if (!profile?.budget) return 'Unknown';
    const cost = getEstimatedCost();
    const budgetNum = parseInt(profile.budget.replace(/[^\d]/g, ''));
    
    if (cost <= budgetNum * 0.8) return 'Within Budget';
    if (cost <= budgetNum * 1.2) return 'Close to Budget';
    return 'Over Budget';
  };

  const getContractors = () => {
    const cost = getEstimatedCost();
    if (cost < 5000) {
      return [
        { name: 'Quick Fix Repairs', phone: '(555) 123-4567', specialty: 'Minor repairs', rating: 4.5 },
        { name: 'Local Handyman Co', phone: '(555) 234-5678', specialty: 'Small projects', rating: 4.3 }
      ];
    } else if (cost < 25000) {
      return [
        { name: 'Mid-Range Restoration', phone: '(555) 345-6789', specialty: 'Medium repairs', rating: 4.7 },
        { name: 'Professional Repair Group', phone: '(555) 456-7890', specialty: 'Insurance work', rating: 4.6 }
      ];
    } else {
      return [
        { name: 'Premium Restoration Co', phone: '(555) 567-8901', specialty: 'Major disasters', rating: 4.9 },
        { name: 'Elite Construction Services', phone: '(555) 678-9012', specialty: 'Full reconstruction', rating: 4.8 }
      ];
    }
  };

  if (!analysis) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6 text-center">
            <p>No analysis data found. Please upload photos first.</p>
            <Button onClick={() => window.location.href = '/upload'} className="mt-4">
              Upload Photos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const riskLevel = getRiskLevel();
  const estimatedCost = getEstimatedCost();
  const budgetMatch = getBudgetMatch();
  const contractors = getContractors();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Assessment Results</h1>
          <p className="text-muted-foreground">
            AI analysis complete for {profile?.address}
          </p>
        </div>

        {/* Analysis Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Damage Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Damage photo ${index + 1}`}
                    className="w-full h-20 object-cover rounded border"
                  />
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Detected Damage</p>
                <p className="text-lg font-semibold">{analysis.type}</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Severity Level</p>
                <p className="text-lg font-semibold">{analysis.severity}</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">AI Confidence</p>
                <p className="text-lg font-semibold">{analysis.confidence}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Risks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Health Risk Assessment
              <Badge variant={riskLevel === 'high' ? 'destructive' : riskLevel === 'medium' ? 'secondary' : 'default'}>
                {riskLevel.toUpperCase()} RISK
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getHealthRisks().map((risk, index) => (
              <Alert key={index} className={risk.level === 'high' ? 'border-destructive' : ''}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{risk.type}</span>
                      <Badge variant={risk.level === 'high' ? 'destructive' : risk.level === 'medium' ? 'secondary' : 'default'}>
                        {risk.level}
                      </Badge>
                    </div>
                    <p className="text-sm">{risk.description}</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Recommended Actions:</p>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {risk.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* Cost Estimation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Cost Estimation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground">Estimated Repair Cost</p>
                <p className="text-2xl font-bold text-primary">${estimatedCost.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Budget Status</p>
                <div className="flex items-center justify-center gap-2">
                  {budgetMatch === 'Within Budget' ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : budgetMatch === 'Over Budget' ? (
                    <XCircle className="h-4 w-4 text-destructive" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  )}
                  <p className="font-semibold">{budgetMatch}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contractor Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Recommended Contractors
            </CardTitle>
            <CardDescription>
              Based on your budget range: {profile?.budget}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contractors.map((contractor, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{contractor.name}</h4>
                  <p className="text-sm text-muted-foreground">{contractor.specialty}</p>
                  <p className="text-sm">⭐ {contractor.rating} rating</p>
                </div>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  {contractor.phone}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="destructive" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Emergency Services: 911
              </Button>
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Poison Control: 1-800-222-1222
              </Button>
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Gas Emergency: 1-800-427-2200
              </Button>
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Electric Emergency: 1-800-611-1911
              </Button>
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                DFS Disaster Hotline: 1-800-339-1759
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;