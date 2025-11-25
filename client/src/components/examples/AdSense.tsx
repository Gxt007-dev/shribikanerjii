import AdSense from '../AdSense';

export default function AdSenseExample() {
  return (
    <div className="space-y-4 p-4 max-w-4xl">
      <AdSense format="horizontal" slot="1234567890" />
      <div className="flex gap-4">
        <div className="flex-1">
          <AdSense format="vertical" slot="0987654321" />
        </div>
        <div className="flex-1">
          <AdSense format="rectangle" slot="1122334455" />
        </div>
      </div>
    </div>
  );
}
