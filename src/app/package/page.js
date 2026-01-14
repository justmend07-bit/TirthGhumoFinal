import PackagesClient from '@/component/package/packageSection';
import Footer from '@/component/footer';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50">
      <PackagesClient />
            <Footer />

    </div>
  );
}
