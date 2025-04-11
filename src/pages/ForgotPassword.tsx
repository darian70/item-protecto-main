import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import supabase from '@/utils/supabaseclient.js';

const ForgotPassword: React.FC = () => {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:3000/update-password', // Change this to your actual redirect URL
        });

        if (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Reset Link Sent",
                description: `Check your inbox (${email}) for a password reset link.`,
            });
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
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

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
                        <p className="text-muted-foreground">
                            Enter your email to reset your password
                        </p>
                    </div>

                    <div className="glass rounded-xl p-6">
                        <form onSubmit={handleResetPassword} className="space-y-4">
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

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Sending...' : (
                                    <>
                                        Send Reset Link
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 pt-6 border-t text-center">
                            <p className="text-sm text-muted-foreground">
                                Back to{' '}
                                <Link to="/signin" className="text-primary hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

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

export default ForgotPassword;
