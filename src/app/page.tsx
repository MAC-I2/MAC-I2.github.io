'use client';

import clsx from 'clsx';
import Head from 'next/head';
import React, { useState } from 'react';
import '@/lib/env';

import { asset } from '@/lib/basePath';
import useDarkMode from '@/lib/storage';

import Figure from '@/components/Figure';
import ArrowLink from '@/components/links/ArrowLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import ExternalSwitch from '@/components/Switch';


// !TODO: fill in the public links once they are available.
const links = {
  github: '#',
  arxiv: '#',
  video: '#',
};

// Method name, typeset with a real superscript so it matches the paper's MAC-I$^2$.
const MACI2 = (
  <>
    MAC-I<sup>2</sup>
  </>
);

export default function HomePage() {
  const [mode, toggleMode] = useDarkMode();
  const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const bgColor = mode === 'dark' ? 'bg-dark' : 'bg-white';
  const maskColor = mode === 'dark' ? 'bg-dark/60' : 'bg-white/60';
  const secondaryBgColor = mode === 'dark' ? 'bg-neutral-700' : 'bg-gray-100';
  const hlTextColor = mode === 'dark' ? 'text-primary-500' : 'text-primary-600';
  const hlBgColor = mode === 'dark' ? 'bg-primary-500' : 'bg-primary-600';

  const citation_bibtex = `@article{fei2026maci2,
    title={MAC-I$^2$: Learned Metrics-Aware Covariance for Robust Visual-Inertial Fusion in Initialization and Calibration},
    author={Fei, Xiang and Qiu, Yuheng and Xu, Can and Chen, Yutian and Li, Ruogu and Zuo, Xingxing and Wang, Wenshan and Scherer, Sebastian},
    year={2026}
  }`;

  // Key quantitative highlights (from the paper abstract / experiments).
  const highlights = [
    { stat: '100%', label: 'Initialization success rate on EuRoC' },
    { stat: '↓ 59%', label: 'Gravity error vs. strongest baseline' },
    { stat: '↓ 74%', label: 'Velocity error vs. strongest baseline' },
    { stat: '71%', label: 'Success rate on challenging VBR sequences' },
  ];

  // ---- Tabbed demonstrations (MAC-VO style tab bar) ----

  // Tab 1 — Challenging environments (3 clips).
  const challenges: Array<{ title: string; src: string; badge?: string; note?: string; className: string }> = [
    { title: 'Illumination Change', src: '/video/illumination.mp4', badge: 'Extreme Exposure', className: 'lg:col-span-6' },
    { title: 'Dynamic Scene', src: '/video/dynamic.mp4', badge: 'Moving Objects', className: 'lg:col-span-6' },
    { title: 'Dark Room', src: '/video/thor_dark.mp4', badge: 'Dark', note: 'Bottom-left shows the input images.', className: 'lg:col-span-6 lg:col-start-4' },
  ];

  // Tab 2 — Real-world deployments (2 x 2 grid).
  const deployments: Array<{ title: string; src: string; className: string }> = [
    { title: 'Handheld Indoor Run', src: '/video/real_world_demo2.mp4', className: 'lg:col-span-6' },
    { title: 'Room-Scale Reconstruction', src: '/video/real_world_demo3.mp4', className: 'lg:col-span-6' },
    { title: 'ZED Point-Cloud Reconstruction', src: '/video/PC_ZED.mp4', className: 'lg:col-span-6' },
    { title: 'Workbench', src: '/video/thor_table.mp4', className: 'lg:col-span-6' },
  ];

  // Tab 3 — VI initialization & calibration (sensor input ↔ estimated trajectory, synchronized).
  const calibSequences = [
    { name: 'Sequence 1', seq: '/video/calib_seq1.mp4', result: '/video/calib_result1.mp4' },
    { name: 'Sequence 2', seq: '/video/calib_seq2.mp4', result: '/video/calib_result2.mp4' },
    { name: 'Sequence 3', seq: '/video/calib_seq3.mp4', result: '/video/calib_result3.mp4' },
    { name: 'Sequence 4', seq: '/video/calib_seq4.mp4', result: '/video/calib_result4.mp4' },
  ];

  const demoTabs: Record<string, typeof challenges> = {
    'Challenging Environments': challenges,
    'Real-World Deployment': deployments as typeof challenges,
  };
  const tabLabels = ['Challenging Environments', 'Real-World Deployment'];
  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  return (
    <main>
      <Head>
        <meta name='google-site-verification' content='' />
      </Head>

      {/* ===================== HERO ===================== */}
      <section
        className={clsx(
          bgColor,
          textColor,
          'relative flex items-center justify-center h-screen overflow-hidden'
        )}
      >
        <div className='absolute top-6 right-4 z-20'>
          <span>Light Mode </span>
          <ExternalSwitch state={mode === 'light'} switch_state={toggleMode} />
        </div>
        <div className='layout z-20 relative flex min-h-screen flex-col items-center justify-center p-4 text-center'>
          <h1 className='mt-4 text-5xl'>
            {/* MAC maps to the leading letters; the squared I stands for the two showcase tasks,
                so those are highlighted as whole words rather than initials. */}
            MAC-I<sup>2</sup>: Learned{' '}
            <span className={hlTextColor}>M</span>etrics-<span className={hlTextColor}>A</span>ware{' '}
            <span className={hlTextColor}>C</span>ovariance for Robust Visual-Inertial Fusion in{' '}
            <span className={hlTextColor}>Initialization</span> and <span className={hlTextColor}>Calibration</span>
          </h1>
          <div className='container mt-8 pb-2'>
            <span className='text-lg'>
              <UnderlineLink href='https://edgarfx.github.io/'>Xiang Fei</UnderlineLink>
              <span className='align-super text-sm leading-none'>*1</span>, &nbsp;
              <UnderlineLink href='https://haleqiu.github.io/'>Yuheng Qiu</UnderlineLink>
              <span className='align-super text-sm leading-none'>*1</span>, &nbsp;
              Can Xu<span className='align-super text-sm leading-none'>1,3</span>, &nbsp;
              <UnderlineLink href='https://www.yutianchen.blog/'>Yutian Chen</UnderlineLink>
              <span className='align-super text-sm leading-none'>1</span>, &nbsp;
              Ruogu Li<span className='align-super text-sm leading-none'>1</span>, &nbsp;
              Xingxing Zuo<span className='align-super text-sm leading-none'>2</span>, &nbsp;
              <UnderlineLink href='http://www.wangwenshan.com/'>Wenshan Wang</UnderlineLink>
              <span className='align-super text-sm leading-none'>1</span>, &nbsp;
              <UnderlineLink href='https://www.ri.cmu.edu/ri-faculty/sebastian-scherer/'>
                Sebastian Scherer
              </UnderlineLink>
              <span className='align-super text-sm leading-none'>1</span>
            </span>
          </div>
          <div className='container flex flex-row flex-wrap items-center gap-x-8 justify-center text-lg'>
            <ArrowLink className='mt-6' href={links.github} variant={mode} size='large'>
              GitHub Repo
            </ArrowLink>
            <ArrowLink className='mt-6' href={links.arxiv} variant={mode} size='large'>
              arXiv Page
            </ArrowLink>
            <ArrowLink className='mt-6' href={links.video} variant={mode} size='large'>
              Video
            </ArrowLink>
          </div>
        </div>
        <div className={clsx('absolute w-auto min-w-full min-h-full max-w-none z-10', maskColor)} />
        <div className='absolute bottom-4 left-4 z-20 text-sm'>
          <p>
            <span className='align-super text-xs'>*</span> Equal Contribution
          </p>
          <p>
            <span className='align-super text-xs'>1</span> Robotics Institute, Carnegie Mellon University
          </p>
          <p>
            <span className='align-super text-xs'>2</span> MBZUAI
          </p>
          <p>
            <span className='align-super text-xs'>3</span> UTIAS, University of Toronto
          </p>
        </div>
        {/* 4x2 mosaic of the four calibration sequences, built from the same clips as the
            Calibration section (see scripts note in the commit that added it). */}
        <video autoPlay loop muted playsInline className='absolute w-auto min-w-full min-h-full max-w-none z-0'>
          <source src={asset('/video/calib_hero.mp4')} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* ===================== ABSTRACT ===================== */}
      <section className={clsx(bgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='text-center pb-4'>Abstract</h2>
          <p className='text-pretty'>
            Visual-Inertial (VI) fusion is fundamental to accurate and robust state estimation, where camera and IMU
            measurements are combined according to their respective uncertainties. Existing methods, however, fuse the
            two modalities with predefined uncertainties, regardless of how reliable each is in the local context, and
            thus often struggle under challenging environments involving illumination changes, dynamic objects, and
            textureless regions. In this paper, we present <span className='font-semibold'>{MACI2}</span>, which achieves
            robust VI fusion through <span className={hlTextColor}>learned metrics-aware covariance</span> for both
            modalities, so that vision and IMU compete on their own merits rather than relying on predefined
            uncertainties. Here, <em>metrics-aware</em> means that each predicted covariance faithfully reflects the
            actual magnitude of the corresponding measurement noise. On the visual side, we propagate learned
            feature-matching uncertainties into pose covariances for the fusion. On the inertial side, motivated by the
            observation that integration error accumulates sharply at the early stage and grows slowly afterward, we
            design a learned IMU model with a learnable initial covariance, and propose a dedicated fine-tuning strategy
            on a held-out training subset to enable the metrics-aware covariance on unseen sequences. As a showcase, we
            apply {MACI2} to build a VI initialization and calibration system, since accurate and robust initialization
            and calibration are the prerequisite for any reliable VI system. Experiments on EuRoC, TUM-VI, and VBR show
            that {MACI2} substantially outperforms existing methods: it achieves a 100% initialization success rate on
            EuRoC, reducing gravity and velocity errors by about 59% and 74% over the strongest baseline, and maintains a
            71% success rate on VBR sequences where competing methods drop below 10% or fail entirely.
          </p>

          {/* Highlights */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 pt-10'>
            {highlights.map(({ stat, label }) => (
              <div
                key={label}
                className={clsx(
                  secondaryBgColor,
                  'rounded-xl p-5 flex flex-col items-center justify-center text-center'
                )}
              >
                <span className={clsx('text-3xl lg:text-4xl font-bold', hlTextColor)}>{stat}</span>
                <span className='text-sm mt-2 font-light'>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DEMONSTRATIONS (TABBED) ===================== */}
      <section className={clsx(secondaryBgColor, textColor)}>
        <div className='layout pt-12 pb-2'>
          <h2 className='mb-4'>Demonstrations</h2>
          <p className='text-lg'>
            {MACI2} stays reliable where predefined uncertainties fail. Explore its behavior across{' '}
            <span className='font-semibold'>challenging environments</span> and real-world{' '}
            <span className='font-semibold'>deployments</span>.
          </p>

          {/* Tab bar */}
          <div className='flex flex-wrap gap-2 mt-8'>
            {tabLabels.map((label) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={clsx(
                  'text-lg px-4 py-1 rounded-lg transition shadow-md',
                  activeTab === label ? clsx(hlBgColor, 'text-white') : clsx(bgColor, textColor)
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className='wide-layout grid grid-cols-1 lg:grid-cols-12 gap-2 pt-6 pb-12'>
          {demoTabs[activeTab].map(({ title, src, badge, note, className }) => (
            <div key={src} className={clsx('rounded-xl flex flex-col text-white bg-neutral-900', className)}>
              <div className='p-2'>
                <p className='lg:text-lg'>
                  {title}{' '}
                  {badge && (
                    <span className='p-1 rounded-lg bg-primary-900 font-light text-base text-primary-500'>
                      {badge}
                    </span>
                  )}
                </p>
                {note && <p className='text-xs text-gray-400 mt-1'>{note}</p>}
              </div>
              <div className='flex-grow' />
              <video controls autoPlay loop muted playsInline className='rounded-xl mx-auto'>
                <source src={asset(src)} type='video/mp4' />
              </video>
              <div className='flex-grow' />
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CALIBRATION ===================== */}
      <section className={clsx(bgColor, textColor)}>
        <div className='layout pt-12 pb-4'>
          <h2 className='mb-4'>Calibration</h2>
          <p className='text-lg'>
            For each sequence we show the <span className='font-semibold'>sensor input</span> (left) and the{' '}
            <span className='font-semibold'>estimated trajectory during calibration</span> (right), played in sync.
          </p>
        </div>
        <div className='wide-layout grid grid-cols-1 lg:grid-cols-2 gap-4 pb-12'>
          {calibSequences.map(({ name, seq, result }) => (
            <div key={name} className='rounded-xl bg-neutral-900 text-white p-3'>
              <p className='pb-2 lg:text-lg'>{name}</p>
              <div className='grid grid-cols-2 gap-2'>
                <video controls autoPlay loop muted playsInline className='rounded-lg w-full aspect-square object-contain bg-black'>
                  <source src={asset(seq)} type='video/mp4' />
                </video>
                <video controls autoPlay loop muted playsInline className='rounded-lg w-full aspect-square object-contain bg-black'>
                  <source src={asset(result)} type='video/mp4' />
                </video>
              </div>
              <div className='grid grid-cols-2 gap-2 pt-1 text-xs text-gray-400'>
                <span className='text-center'>Sensor Input</span>
                <div className='text-center'>
                  <p>Estimated Trajectory during Calibration</p>
                  <p className='mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1'>
                    <span className='inline-flex items-center gap-1'>
                      <span className='inline-block h-0.5 w-4 rounded-full bg-red-500' />
                      Ground Truth
                    </span>
                    <span className='inline-flex items-center gap-1'>
                      <span className='inline-block h-0.5 w-4 rounded-full bg-blue-500' />
                      {MACI2} Estimated
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== METHOD ===================== */}
      <section className={clsx(secondaryBgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='pb-4'>Method</h2>
          <p className='text-lg'>
            {MACI2} learns <span className={hlTextColor}>metrics-aware covariance</span> for both modalities, so that each
            measurement is weighted by its actual reliability in the local context rather than by a predefined rule.
          </p>

          <h3 className='pt-8'>Metrics-Aware Visual Covariance</h3>
          <p className='py-2 text-lg'>
            On the visual side, we propagate the learned feature-matching uncertainties from MAC-VO into{' '}
            <span className={hlTextColor}>pose covariances</span> through the information matrix at the convergence of the
            visual pose estimation, bringing metrics-aware visual uncertainty into the fusion.
          </p>
          <Figure
            img_src={asset('/images/pose_cov_euroc_bin16.png')}
            caption='The learned visual pose covariance tracks the actual magnitude of the pose error across the sequence.'
            isDark={mode === 'dark'}
            idx={1}
          />

          <h3 className='pt-8'>Metrics-Aware Inertial Covariance</h3>
          <p className='py-2 text-lg'>
            On the inertial side, the integration error accumulates sharply at the early stage of the integration window
            and grows slowly afterward. We design a learned IMU model with a{' '}
            <span className={hlTextColor}>learnable initial covariance</span> to capture this pattern, together with a{' '}
            <span className={hlTextColor}>held-out fine-tuning strategy</span> that keeps the predicted covariance
            metrics-aware on unseen sequences.
          </p>
          <Figure
            img_src={asset('/images/imu_cov.png')}
            caption='The learned inertial covariance faithfully reflects the actual magnitude of the IMU integration error.'
            isDark={mode === 'dark'}
            idx={2}
          />

          <h3 className='pt-12'>Showcase: VI Initialization &amp; Calibration</h3>
          <p className='py-2 text-lg'>
            As a showcase application, we build a VI initialization and calibration system upon {MACI2}, since accurate
            and robust initialization and calibration are the prerequisite for any reliable VI system.
          </p>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-4'>
            <Figure
              img_src={asset('/images/system_overview.png')}
              caption={<>System overview of the {MACI2} initialization and calibration pipeline.</>}
              isDark={mode === 'dark'}
              idx={3}
            />
            <div className='text-lg space-y-3'>
              <p>
                Both metrics-aware covariances feed a single VI fusion, letting vision and IMU{' '}
                <span className='font-semibold'>compete on their own merits</span>.
              </p>
              <p>
                The system jointly recovers the initialization states (gravity, velocity, and scale) and the
                camera–IMU extrinsic calibration, all weighted by the learned reliability of each measurement.
              </p>
              <p>
                Because unreliable measurements are no longer over-weighted, {MACI2} remains robust under illumination
                changes, dynamic objects, and textureless regions — where methods with predefined uncertainties degrade
                or fail entirely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== RESULTS ===================== */}
      <section className={clsx(bgColor, textColor)}>
        <div className='layout py-12'>
          <h2 className='pb-4'>Quantitative Results</h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-start [&_img]:h-[340px] [&_img]:w-auto [&_img]:object-contain [&_img]:mx-auto'>
            <Figure
              img_src={asset('/images/euroc_gerr_vs_sr.png')}
              caption={
                <>
                  Gravity error vs. initialization success rate on EuRoC — {MACI2} reaches a 100% success rate with the
                  lowest gravity error.
                </>
              }
              isDark={mode === 'dark'}
              idx={4}
            />
            <Figure
              img_src={asset('/images/calib_results.png')}
              caption='Calibration accuracy across sequences compared with existing methods.'
              isDark={mode === 'dark'}
              idx={5}
            />
          </div>
        </div>
      </section>

      {/* ===================== CITATION ===================== */}
      <section className={clsx(secondaryBgColor, textColor)}>
        <div className='layout pt-12 pb-48'>
          <h2 className='mb-4'>Citation</h2>
          <pre className={clsx(bgColor, 'rounded-xl p-4 overflow-x-auto text-sm')}>{citation_bibtex}</pre>
        </div>
      </section>
    </main>
  );
}
