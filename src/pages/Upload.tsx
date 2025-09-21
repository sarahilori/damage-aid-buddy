import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload as UploadIcon, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Upload = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPhotos(prev => [...prev, e.target!.result as string]);
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

  const analyzePhotos = async () => {
    if (photos.length === 0) {
      toast({
        title: 'No Photos',
        description: 'Please upload at least one photo to analyze',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Store photos for analysis results
      localStorage.setItem('damagePhotos', JSON.stringify(photos));
      
      // Enhanced AI damage detection with hidden health risk analysis
      const damageTypes = [
        'Water Damage',
        'Fire Damage', 
        'Structural Damage',
        'Roof Damage',
        'Electrical Damage'
      ];
      
      // Simulate advanced AI analysis that can detect hidden risks
      const detectedDamage = {
        type: damageTypes[Math.floor(Math.random() * damageTypes.length)],
        severity: ['Minor', 'Moderate', 'Severe'][Math.floor(Math.random() * 3)],
        confidence: (85 + Math.random() * 15).toFixed(1) + '%',
        hiddenRisks: [
          'Potential mold growth in wall cavities',
          'Compromised water quality detected',
          'Electrical hazards not visible in photos',
          'Air quality concerns from particulates'
        ]
      };
      
      localStorage.setItem('aiAnalysis', JSON.stringify(detectedDamage));
      
      setIsAnalyzing(false);
      toast({
        title: 'Analysis Complete',
        description: `Detected ${detectedDamage.type} with ${detectedDamage.confidence} confidence`,
        variant: 'default'
      });
      
      navigate('/results');
    }, 3000);
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Upload Damage Photos</h1>
          <p className="text-muted-foreground">
            Take clear photos of the damaged areas for AI analysis
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Photo Capture
            </CardTitle>
            <CardDescription>
              Use your camera or upload existing photos of the damage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button 
                onClick={handleCameraCapture} 
                className="flex-1"
                disabled={isAnalyzing}
              >
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
                disabled={isAnalyzing}
              >
                <UploadIcon className="h-4 w-4 mr-2" />
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

            {photos.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {photos.length} photo{photos.length !== 1 ? 's' : ''} uploaded
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Damage photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removePhoto(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Button 
              onClick={analyzePhotos} 
              className="w-full" 
              size="lg"
              disabled={isAnalyzing || photos.length === 0}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Analyze Damage
                </>
              )}
            </Button>
            
            {photos.length === 0 && (
              <p className="text-center text-sm text-muted-foreground mt-2">
                Upload photos to enable analysis
              </p>
            )}
          </CardContent>
        </Card>

        {isAnalyzing && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="font-medium">AI Analysis in Progress</p>
                <p className="text-sm text-muted-foreground">
                  Analyzing visible damage and scanning for hidden health risks like mold, water quality issues, and electrical hazards...
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Upload;