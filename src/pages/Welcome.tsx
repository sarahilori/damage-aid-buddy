import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Camera, Calculator, Heart } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: 'Photo Documentation',
      description: 'Capture damage with your phone camera for accurate assessment'
    },
    {
      icon: Calculator,
      title: 'Cost Estimation',
      description: 'Get instant cost estimates for repairs and restoration'
    },
    {
      icon: Shield,
      title: 'Health Risk Analysis',
      description: 'Identify potential health hazards and safety protocols'
    },
    {
      icon: Heart,
      title: 'Safety Management',
      description: 'Access emergency contacts and professional recommendations'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Damage Aid Buddy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive post-disaster assessment tool for cost estimation, 
            health risk identification, and safety management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            onClick={() => navigate('/profile')}
            className="px-8 py-3 text-lg"
          >
            Get Started
          </Button>
          <p className="text-sm text-muted-foreground">
            Begin your disaster assessment journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;