import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { User, MapPin, DollarSign, Shield } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    budget: '',
    consent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile.name || !profile.address || !profile.budget) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    if (!profile.consent) {
      toast({
        title: 'Consent Required',
        description: 'Please agree to the terms and conditions to continue',
        variant: 'destructive'
      });
      return;
    }

    // Save profile to localStorage for later use
    localStorage.setItem('damageAidProfile', JSON.stringify(profile));
    
    toast({
      title: 'Profile Created',
      description: 'Your profile has been saved successfully',
      variant: 'default'
    });

    navigate('/upload');
  };

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center gap-2 justify-center">
              <User className="h-6 w-6" />
              Create Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Property Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter property address"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <select
                    id="budget"
                    value={profile.budget}
                    onChange={(e) => setProfile(prev => ({ ...prev, budget: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select your budget range</option>
                    <option value="Under $500">Under $500 (Emergency repairs)</option>
                    <option value="$500 - $1,500">$500 - $1,500 (Minor repairs)</option>
                    <option value="$1,500 - $3,000">$1,500 - $3,000 (Small projects)</option>
                    <option value="$3,000 - $7,500">$3,000 - $7,500 (Moderate repairs)</option>
                    <option value="$7,500 - $15,000">$7,500 - $15,000 (Major repairs)</option>
                    <option value="$15,000 - $30,000">$15,000 - $30,000 (Extensive work)</option>
                    <option value="Over $30,000">Over $30,000 (Full restoration)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consent"
                    checked={profile.consent}
                    onCheckedChange={(checked) => 
                      setProfile(prev => ({ ...prev, consent: checked as boolean }))
                    }
                  />
                  <div className="space-y-2">
                    <Label 
                      htmlFor="consent" 
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I consent to the collection and use of my information for damage assessment purposes. 
                      I understand that this tool provides estimates and recommendations but does not replace 
                      professional inspections or medical advice.
                    </Label>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="h-3 w-3" />
                      Your data is stored locally and securely
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Continue to Assessment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;