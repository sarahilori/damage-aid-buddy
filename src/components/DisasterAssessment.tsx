import { useState, useRef } from 'react';
import { Camera, Upload, AlertTriangle, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface DamageAssessment {
  id: string;
  photos: string[];
  damageType: string;
  severity: string;
  location: string;
  description: string;
  estimatedCost: number;
  healthRisks: string[];
  riskLevel: 'low' | 'medium' | 'high';
  timestamp: Date;
}

interface HealthRisk {
  type: string;
  level: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
}

const DAMAGE_TYPES = [
  'Structural Damage',
  'Water Damage',
  'Fire Damage',
  'Wind Damage',
  'Flood Damage',
  'Electrical Damage',
  'Plumbing Damage',
  'Roof Damage',
  'Foundation Damage',
  'Other'
];

const HEALTH_RISK_DATABASE: Record<string, HealthRisk[]> = {
  'Water Damage': [
    {
      type: 'Mold Growth',
      level: 'high',
      description: 'Standing water and moisture can lead to dangerous mold growth within 24-48 hours',
      recommendations: ['Immediate water extraction', 'Professional mold inspection', 'Use dehumidifiers', 'Wear N95 masks']
    },
    {
      type: 'Bacterial Contamination',
      level: 'medium',
      description: 'Contaminated water may contain harmful bacteria',
      recommendations: ['Avoid direct contact', 'Use protective equipment', 'Professional water testing']
    }
  ],
  'Fire Damage': [
    {
      type: 'Smoke Inhalation Risk',
      level: 'high',
      description: 'Residual smoke particles and chemicals pose respiratory risks',
      recommendations: ['Ventilate area immediately', 'Wear respiratory protection', 'Professional air quality testing']
    },
    {
      type: 'Toxic Chemical Exposure',
      level: 'high',
      description: 'Burned materials may release toxic compounds',
      recommendations: ['Evacuate affected areas', 'Professional hazmat assessment', 'Use proper PPE']
    }
  ],
  'Electrical Damage': [
    {
      type: 'Electrocution Risk',
      level: 'high',
      description: 'Exposed or damaged electrical systems pose immediate danger',
      recommendations: ['Turn off main power', 'Professional electrical inspection', 'Avoid water near electrical']
    }
  ],
  'Structural Damage': [
    {
      type: 'Collapse Risk',
      level: 'high',
      description: 'Compromised structural integrity poses immediate physical danger',
      recommendations: ['Evacuate immediately', 'Professional structural engineer assessment', 'Secure perimeter']
    },
    {
      type: 'Asbestos Exposure',
      level: 'medium',
      description: 'Older buildings may contain asbestos in damaged materials',
      recommendations: ['Professional asbestos testing', 'Avoid disturbing materials', 'Use respiratory protection']
    }
  ]
};

const COST_ESTIMATES: Record<string, { low: number; medium: number; high: number }> = {
  'Water Damage': { low: 2500, medium: 7500, high: 15000 },
  'Fire Damage': { low: 5000, medium: 25000, high: 75000 },
  'Structural Damage': { low: 10000, medium: 35000, high: 100000 },
  'Roof Damage': { low: 3000, medium: 12000, high: 30000 },
  'Electrical Damage': { low: 1500, medium: 8000, high: 20000 },
  'Wind Damage': { low: 2000, medium: 10000, high: 25000 },
  'Flood Damage': { low: 5000, medium: 20000, high: 50000 },
  'Plumbing Damage': { low: 1000, medium: 5000, high: 15000 },
  'Foundation Damage': { low: 8000, medium: 25000, high: 60000 },
  'Other': { low: 1000, medium: 5000, high: 15000 }
};

const DisasterAssessment = () => {
  const [assessments, setAssessments] = useState<DamageAssessment[]>([]);
  const [currentAssessment, setCurrentAssessment] = useState({
    photos: [] as string[],
    damageType: '',
    severity: '',
    location: '',
    description: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setCurrentAssessment(prev => ({
              ...prev,
              photos: [...prev.photos, e.target!.result as string]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.capture = 'environment';
      fileInputRef.current.click();
    }
  };

  const calculateCost = (damageType: string, severity: string): number => {
    const costs = COST_ESTIMATES[damageType] || COST_ESTIMATES['Other'];
    switch (severity) {
      case 'Minor': return costs.low;
      case 'Moderate': return costs.medium;
      case 'Severe': return costs.high;
      default: return costs.low;
    }
  };

  const assessHealthRisks = (damageType: string): { risks: string[]; level: 'low' | 'medium' | 'high' } => {
    const risks = HEALTH_RISK_DATABASE[damageType] || [];
    const riskNames = risks.map(risk => risk.type);
    const highestLevel = risks.reduce((highest, risk) => {
      if (risk.level === 'high') return 'high';
      if (risk.level === 'medium' && highest !== 'high') return 'medium';
      return highest;
    }, 'low' as 'low' | 'medium' | 'high');

    return { risks: riskNames, level: highestLevel };
  };

  const submitAssessment = () => {
    if (!currentAssessment.damageType || !currentAssessment.severity || !currentAssessment.location) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    const { risks, level } = assessHealthRisks(currentAssessment.damageType);
    const estimatedCost = calculateCost(currentAssessment.damageType, currentAssessment.severity);

    const newAssessment: DamageAssessment = {
      id: Date.now().toString(),
      ...currentAssessment,
      estimatedCost,
      healthRisks: risks,
      riskLevel: level,
      timestamp: new Date()
    };

    setAssessments(prev => [newAssessment, ...prev]);
    setCurrentAssessment({
      photos: [],
      damageType: '',
      severity: '',
      location: '',
      description: ''
    });

    toast({
      title: 'Assessment Saved',
      description: `Damage assessment recorded with ${risks.length} health risks identified`,
      variant: 'default'
    });
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getHealthRecommendations = (damageType: string): string[] => {
    const risks = HEALTH_RISK_DATABASE[damageType] || [];
    return risks.flatMap(risk => risk.recommendations);
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Disaster Assessment Tool</h1>
          <p className="text-muted-foreground">Document damage, assess costs, and identify health risks</p>
        </div>

        {/* Photo Capture Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Document Damage
            </CardTitle>
            <CardDescription>
              Take photos of the damaged area to support your assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={handleCameraCapture} className="flex-1">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              multiple
              accept="image/*"
              className="hidden"
            />

            {currentAssessment.photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentAssessment.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Damage photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Assessment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Damage Assessment</CardTitle>
            <CardDescription>Provide details about the damage observed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="damageType">Damage Type *</Label>
                <Select 
                  value={currentAssessment.damageType} 
                  onValueChange={(value) => setCurrentAssessment(prev => ({ ...prev, damageType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select damage type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAMAGE_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity *</Label>
                <Select 
                  value={currentAssessment.severity} 
                  onValueChange={(value) => setCurrentAssessment(prev => ({ ...prev, severity: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Minor">Minor</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={currentAssessment.location}
                onChange={(e) => setCurrentAssessment(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Living room, Kitchen, Basement"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentAssessment.description}
                onChange={(e) => setCurrentAssessment(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the damage in detail..."
                rows={3}
              />
            </div>

            <Button onClick={submitAssessment} className="w-full">
              Save Assessment
            </Button>
          </CardContent>
        </Card>

        {/* Assessment Results */}
        {assessments.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Assessment Results</h2>
            {assessments.map(assessment => (
              <Card key={assessment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{assessment.damageType} - {assessment.location}</CardTitle>
                      <CardDescription>
                        {assessment.timestamp.toLocaleDateString()} at {assessment.timestamp.toLocaleTimeString()}
                      </CardDescription>
                    </div>
                    <Badge variant={getRiskBadgeVariant(assessment.riskLevel)}>
                      {assessment.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessment.photos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {assessment.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Assessment photo ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="font-semibold">
                        Estimated Cost: ${assessment.estimatedCost.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span>Severity: {assessment.severity}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {assessment.riskLevel === 'high' ? (
                        <XCircle className="h-4 w-4 text-danger" />
                      ) : assessment.riskLevel === 'medium' ? (
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                      <span>Health Risk: {assessment.riskLevel}</span>
                    </div>
                  </div>

                  {assessment.healthRisks.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Health Risks Identified:</h4>
                      <div className="flex flex-wrap gap-2">
                        {assessment.healthRisks.map((risk, index) => (
                          <Badge key={index} variant="outline">{risk}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {assessment.damageType && getHealthRecommendations(assessment.damageType).length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Safety Recommendations:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {getHealthRecommendations(assessment.damageType).map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {assessment.description && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Description:</h4>
                      <p className="text-sm text-muted-foreground">{assessment.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisasterAssessment;