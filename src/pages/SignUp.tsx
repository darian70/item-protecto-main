import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '../utils/supabaseClient';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);


    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      toast({
        title: "Success",
        description: "Account created successfully!",
        duration: 3000,
      });

      navigate('/app/products');

      if (error) {
        setError(error.message);
      } else {
        alert('Check your email for verification!');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }

  }



    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground rounded-md p-1.5">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-semibold text-lg">WarrantyKeeper</span>
            </Link>
          </div>
        </header>

        {/* Sign Up Form */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Create your account</h1>
              <p className="text-muted-foreground">
                Start managing your warranties with WarrantyKeeper
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Must be at least 8 characters long
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 rounded border-gray-300"
                    required
                  />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the{' '}
                    <a href="#terms" className="text-primary hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#privacy" className="text-primary hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Creating account..."
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="border-t py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
              <a href="#terms" className="hover:text-foreground">Terms</a>
              <a href="#privacy" className="hover:text-foreground">Privacy</a>
              <a href="#contact" className="hover:text-foreground">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  export default SignUp;