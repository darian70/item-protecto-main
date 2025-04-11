// app/index.tsx or app/page.tsx if using App Router
'use client';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, User } from 'lucide-react';
import supabase from '@/utils/supabaseclient';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch product count from Supabase
  useEffect(() => {
    const fetchProductCount = async () => {
      setLoading(true);
      const { data, error, count } = await supabase
        .from('Product')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error("Error fetching product count:", error.message);
      } else {
        setProductCount(count || 0);
      }
      setLoading(false);
    };

    fetchProductCount();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-2xl font-bold">Welcome back 👋</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-all cursor-pointer" onClick={() => navigate('/app/products')}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-muted-foreground text-sm">Products</div>
                <div className="text-2xl font-semibold">
                  {loading ? 'Loading...' : productCount}
                </div>
              </div>
              <Package className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-muted-foreground text-sm">Orders</div>
                <div className="text-2xl font-semibold">Coming Soon</div>
              </div>
              <ShoppingCart className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <div className="text-muted-foreground text-sm">Users</div>
                <div className="text-2xl font-semibold">Coming Soon</div>
              </div>
              <User className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>

        <div>
          <Button onClick={() => navigate('/app/products')}>Go to Products</Button>
        </div>
      </div>
    </Layout>
  );
}
