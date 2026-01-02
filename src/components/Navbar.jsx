
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { motion } from 'framer-motion';
import { Menu, X, Contact, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  if (user) {
    navLinks.splice(1, 0, { name: 'Dashboard', path: '/dashboard' });
  }

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-md">
              <Contact className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-slate-50">
              VCF<span className="text-primary">Generator</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path 
                      ? 'text-primary' 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800">
              <ThemeToggle />
              
              {user ? (
                 <Button 
                   onClick={signOut} 
                   variant="ghost" 
                   className="text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                 >
                   <LogOut className="w-4 h-4 mr-2" />
                   Sign Out
                 </Button>
              ) : (
                <Link to="/login">
                  <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm dark:text-slate-900">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-base font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
             {user ? (
                 <button 
                   onClick={() => { signOut(); setIsOpen(false); }}
                   className="w-full text-left py-2 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                 >
                   Sign Out
                 </button>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                   <span className="block py-2 text-base font-medium text-primary font-semibold">
                    Get Started
                   </span>
                </Link>
              )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
