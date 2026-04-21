/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X, Instagram, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { useState, useRef, type ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BURGER_IMAGE = "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop";
const BURGER_MACRO = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="border-[8px] border-brand-red min-h-screen relative overflow-hidden">
      <div ref={containerRef} className="relative min-h-screen font-sans selection:bg-brand-red selection:text-white overflow-x-hidden">
        {/* Grain Overlay */}
        <div className="grain-overlay" />

        {/* Side Rail Text */}
        <div className="absolute top-0 right-0 w-24 h-full border-l border-brand-red border-opacity-20 hidden lg:flex items-center justify-center z-40">
          <div className="rotate-90 whitespace-nowrap text-[10px] font-mono tracking-[0.5em] text-brand-red opacity-40 uppercase">
            CULTURA URBANA // COMIDA DE RUA // ALTA VOLTAGEM
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative p-8 md:p-12 flex justify-between items-start z-[100] pointer-events-none">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-brand-red text-white p-4 text-4xl font-black tracking-tighter leading-none pointer-events-auto transform -rotate-1"
          >
            CURB<br />PORTO
          </motion.div>

          <div className="flex flex-col items-end gap-3 pointer-events-auto">
            <div className="tape text-xs">Aberto até às 03:00</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 text-right">
              Rua de Cedofeita 452<br />Porto, Portugal
            </div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mt-4 w-14 h-14 bg-brand-white text-brand-black flex items-center justify-center brutalist-border sticker-shadow hover:sticker-shadow-red transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <motion.div 
          initial={false}
          animate={isMenuOpen ? { x: 0 } : { x: '100%' }}
          className="fixed inset-0 bg-brand-red z-[90] flex flex-col justify-center items-center p-12 text-white"
        >
          <div className="flex flex-col gap-8 text-center">
            {['A EMENTA', 'LOCALIZAÇÕES', 'SOBRE', 'CONTACTO'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-6xl md:text-8xl font-black hover:italic transition-all uppercase tracking-tighter"
                whileHover={{ scale: 1.1, x: 20 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Hero Section */}
        <header className="relative min-h-[calc(100vh-200px)] flex flex-col justify-center px-8 md:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="z-10">
              <motion.h1 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[100px] md:text-[140px] leading-[0.85] font-black uppercase tracking-tighter mb-12"
              >
                MENOS <span className="text-brand-red">REGRAS</span>
              <span className="block italic">MAIS</span> SUMO.
            </motion.h1>
            
            <div className="mt-12 flex flex-wrap gap-6">
              <StickerButton className="bg-brand-red text-white transform -rotate-3">
                PEDIR AGORA
              </StickerButton>
              <StickerButton className="bg-brand-white text-brand-black transform rotate-2">
                A EMENTA
              </StickerButton>
            </div>
            </div>

            <div className="relative flex items-center justify-center">
              {/* Radial Glow */}
              <div className="absolute w-[500px] h-[500px] rounded-full burger-hero opacity-20 blur-3xl" />
              
              <div className="relative z-10 w-full max-w-md">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-square brutalist-border sticker-shadow-red overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                >
                  <img 
                    src={BURGER_IMAGE} 
                    alt="Smash Burger" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 tape text-[10px]">
                    80% GORDURA / 20% MAGRA
                  </div>
                  <div className="absolute bottom-4 right-4 bg-brand-red text-white font-mono text-[10px] p-2 uppercase font-bold">
                    VIBE AUTÊNTICA DO PORTO
                  </div>
                </motion.div>
                
                {/* Warehouse Receipt Block */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="receipt absolute -bottom-10 -right-10 w-64 brutal-shadow hidden md:block"
                >
                  <div className="border-b border-dashed border-black mb-2 pb-1 font-bold text-xs uppercase">TALÃO DE ARMAZÉM #802</div>
                  <div className="text-[10px] leading-relaxed font-mono">
                    01. SMASH CLÁSSICO ...... €9.50<br />
                    02. BOMBA DE TRUFA ...... €12.00<br />
                    03. CEBOLA NO CÉU ...... €10.50<br />
                    04. PORTO AGRESSIVO ....... €11.00<br />
                    --------------------------<br />
                    <span className="font-bold">TOTAL: SABOR CRÍTICO</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </header>

        {/* Marquee */}
        <section className="bg-brand-red py-6 overflow-hidden whitespace-nowrap border-y-4 border-brand-white mt-12">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          {Array(10).fill("").map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-black text-white uppercase mx-8">
              SMASHED NO PORTO • SMASHED NO PORTO •
            </span>
          ))}
        </motion.div>
      </section>

      {/* Menu Section */}
      <section id="the lineup" className="py-24 px-6 md:px-24 bg-brand-black relative">
        <div className="absolute top-0 right-0 p-8">
          <motion.div style={{ rotate }} className="w-32 h-32 border-4 border-dashed border-brand-red rounded-full flex items-center justify-center opacity-30">
            <span className="font-mono text-[10px] text-center p-4 text-brand-red">COMIDA DE RUA AUTÊNTICA • CURB • COMIDA DE RUA AUTÊNTICA</span>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-8xl font-black uppercase mb-16 text-brand-white">A <span className="italic text-brand-red">EMENTA</span></h2>
          
          <div className="bg-[#f0f0f0] text-brand-black p-8 md:p-12 sticker-shadow-red transform rotate-1 font-mono relative overflow-hidden">
            {/* Receipt Pattern Background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
            
            <div className="flex justify-between border-b-2 border-dashed border-brand-black pb-4 mb-8">
              <span className="font-bold">DESCRIÇÃO_ITEM</span>
              <span className="font-bold">PREÇO</span>
            </div>

            <div className="space-y-12">
              <MenuItem 
                name="O SMASH ORIGINAL" 
                price="12.00" 
                desc="Dois hambúrgueres maturados, molho secreto curb, picles, pão de batata."
                tag="BESTSELLER"
              />
              <MenuItem 
                name="HOT CHICK VIBE" 
                price="13.50" 
                desc="Frango picante de Nashville, manteiga de mel, slaw roxa, jalapeños."
              />
              <MenuItem 
                name="PORTO GANGSTER" 
                price="14.00" 
                desc="Hambúrgueres smash, redução de molho de francesinha, crocante de chouriço, ovo."
                tag="LOCAL"
              />
              <MenuItem 
                name="BATATAS SUJAS" 
                price="06.50" 
                desc="Fritura dupla, queijo dourado líquido, pó de bacon, cebolinho."
              />
            </div>

            <div className="mt-16 pt-8 border-t-2 border-dashed border-brand-black text-center">
              <p className="text-xs mb-4">**** OBRIGADO POR ALIMENTARES A BESTA ****</p>
              <img src="https://barcode.tec-it.com/barcode.ashx?data=CURBPORTO2024&code=Code128&drawText=false" alt="Barcode" className="mx-auto h-12 grayscale invert" />
              <p className="text-[10px] mt-2 opacity-50">TX_ID: 992-04-21-PRT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Born In Porto Section */}
      <section id="about" className="py-24 px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="relative">
            <img 
              src={BURGER_MACRO} 
              alt="Macro Burger" 
              className="w-full aspect-square object-cover brutalist-border grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-4 -right-4 bg-brand-red text-white p-4 font-mono text-xs brutalist-border transform rotate-12">
              EST. 2024
            </div>
          </div>
        </div>
        
        <div className="order-1 md:order-2">
          <h2 className="text-7xl font-black uppercase mb-8 leading-[0.9]">NASCIDO NO <span className="text-brand-red">PORTO</span></h2>
          <p className="text-xl md:text-2xl font-mono leading-relaxed opacity-80 mb-12">
            NÃO QUERÍAMOS UM RESTAURANTE BONITINHO. QUERÍAMOS LUTA. 
            INGREDIENTES PUROS. ALMA DE RUA. O HAMBÚRGUER MAIS BARULHENTO DA CIDADE.
          </p>
          
          <div className="flex gap-4">
            <div className="flex-1 border-2 border-brand-white p-6 hover:bg-brand-white hover:text-brand-black transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <span className="text-3xl font-black uppercase">O BERÇO</span>
                <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-mono text-sm mt-4">RUA DE CEDOFEITA, 452, PORTO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Encontra-nos Map Section */}
      <section className="bg-vibrant-red py-24 px-6 md:px-24 flex flex-col items-center text-white relative z-10">
        <h2 className="text-6xl md:text-8xl font-bubble mb-12 drop-shadow-xl text-center">ENCONTRA-NOS</h2>
        
        <div className="w-full max-w-4xl bg-white border-[8px] border-white rounded-[30px] overflow-hidden shadow-2xl transform md:-rotate-1">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.1754529288805!2d-8.6199909!3d41.1525227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24651e1f0e2ed1%3A0x1378469b16c670eb!2sCURB!5e0!3m2!1ses!2spt!4v1776739329635!5m2!1ses!2spt" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl md:text-3xl font-sans font-bold mb-8 rounded-full">Rua da Torrinha 111, Porto</p>
          
          <a 
            href="https://maps.app.goo.gl/oYg3M8kr3NGPzPdD7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-vibrant-red px-8 py-4 text-xl font-bold rounded-full hover-pulse transition-all shadow-lg"
          >
            ABRIR NO GOOGLE MAPS
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-end z-20 border-t-4 border-brand-white mt-24">
        <div className="flex flex-wrap gap-8 md:gap-16 font-mono text-[10px] uppercase opacity-60 mb-8 md:mb-0">
          <div>EST. 2024<br />PORTO, PT</div>
          <div>RIGOROSAMENTE<br />BRUTALISTA</div>
          <div>SEM<br />RESERVAS</div>
          <div>GOURMET<br />DE RUA</div>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-24 h-px bg-brand-white opacity-30"></div>
          <motion.span 
            initial={{ opacity: 0.1 }}
            whileHover={{ opacity: 0.5 }}
            className="text-4xl md:text-8xl font-black opacity-10 uppercase tracking-tighter"
          >
            NASCIDO NO PORTO
          </motion.span>
        </div>
      </footer>
      </div>
    </div>
  );
}

function MenuItem({ name, price, desc, tag }: { name: string, price: string, desc: string, tag?: string }) {
  return (
    <div className="group cursor-default">
      <div className="flex justify-between items-baseline mb-2">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl md:text-3xl font-bold group-hover:italic transition-all">{name}</h3>
          {tag && (
            <span className="bg-brand-black text-brand-white px-2 py-0.5 text-[10px] transform -rotate-3">{tag}</span>
          )}
        </div>
        <span className="text-xl font-bold">€{price}</span>
      </div>
      <p className="text-sm opacity-60 leading-tight max-w-sm">{desc}</p>
    </div>
  );
}

function StickerButton({ children, className, onClick }: { children: ReactNode, className?: string, onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: 0 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "px-8 py-4 text-xl font-black uppercase brutalist-border sticker-shadow transition-all hover:shadow-none translate-y-0 active:translate-y-2",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
