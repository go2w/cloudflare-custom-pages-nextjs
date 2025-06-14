import { Card, CardBody } from "@heroui/card";

export const Footer = () => {
  return (
    <div className='mb-4 mx-4'>
      <Card className='overflow-hidden bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-100/50 dark:border-gray-800/50 rounded-xl shadow-lg'>
        <CardBody className='py-4 px-4 sm:px-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-gray-600 dark:text-gray-300 text-sm'>
            <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-3'>
              <div className='flex items-center gap-1.5'>
                <span className='font-medium'>IP:</span>
                <span className='font-mono text-xs sm:text-sm bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded-md'>
                  ::CLIENT_IP::
                </span>
              </div>
              <span className='hidden sm:inline text-gray-400 dark:text-gray-600'>•</span>
              <div className='flex items-center gap-1.5'>
                <span className='font-medium'>Ray ID:</span>
                <span className='font-mono text-xs sm:text-sm bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded-md'>
                  ::RAY_ID::
                </span>
              </div>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='font-medium'>Location:</span>
              <span className='font-mono text-xs sm:text-sm bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded-md'>
                ::GEO::
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Footer;
