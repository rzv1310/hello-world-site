import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          Hello World
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Bine ai venit. Începe să construiești ceva extraordinar.
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
