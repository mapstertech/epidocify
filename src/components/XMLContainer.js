import { useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { Controlled as CodeMirror } from 'react-codemirror2'
import $ from 'jquery';
import hBeautify from 'js-beautify';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml.js';

import { useXMLContext } from '../contexts/XMLContext';

function XMLContainer() {

  const [ modalOpen, setModalOpen ] = useState(false);
  const [ xmlString, setXMLString ] = useState('');
  const { xml : { general, description }, dispatch } = useXMLContext()

  // <title>Price <rs type="textType">edict</rs> of the emperor Diocletian.</title>

  const exampleXML = `
    <?xml version="1.0" encoding="UTF-8"?>
    <?xml-model href="http://www.stoa.org/epidoc/schema/dev/tei-epidoc.rng" schematypens="http://relaxng.org/ns/structure/1.0"?>
    <?xml-model href="http://www.stoa.org/epidoc/schema/dev/ircyr-checking.sch" schematypens="http://purl.oclc.org/dsdl/schematron"?>
    <?xml-model href="http://www.stoa.org/epidoc/schema/dev/tei-epidoc.rng" schematypens="http://purl.oclc.org/dsdl/schematron"?>
    <TEI xmlns="http://www.tei-c.org/ns/1.0" xml:id="P42500" xml:lang="en">
       <teiHeader>
          <fileDesc>
             <titleStmt>
                <title>Price <rs type="textType">edict</rs> of the emperor Diocletian.</title>
                             <editor xml:id="edd">Editors</editor> <editor xml:id="jmr">Joyce M. Reynolds </editor> <editor xml:id="cmr"> Charlotte Roueché</editor>
             </titleStmt>
             <publicationStmt>
                <authority>Centre for Computing in the Humanities, King's College London</authority>
                <idno type="filename">P.144</idno>
                <idno type="ircyr2012">P42500</idno>
                <availability>
                   <p>Creative Commons licence Attribution UK 2.0
                        (<ref>http://creativecommons.org/licenses/by/2.0/uk/</ref>)</p>
                   <p>All reuse or distribution of this work must contain somewhere a link back to the
                        URL <ref>http://inslib.kcl.ac.uk/</ref>
                   </p>
                </availability>
             </publicationStmt>
             <sourceDesc>
                <msDesc>
                   <msIdentifier><repository ref="institution.xml#db1096">Tolmeita Museum</repository></msIdentifier>
                   <physDesc>
                      <objectDesc>
                         <supportDesc>
                            <support>
                             <p><material>Marble</material> <objectType>panel</objectType>s found in many fragments; A-N can be assembled to make the largest and most complete part,
                                at least <dimensions><width>1.03</width> <height>1.07</height> <depth>0.14 - 0.21</depth></dimensions>,
                                thinner in the upper part and progressively thickening to the lower edge.
                                M: <dimensions><height>0.19</height> <depth>0.026</depth></dimensions>;
                                N:<dimensions> <width>0.12</width> <height>0.15</height></dimensions>; O:<dimensions><width>0.09</width> <height>0.12</height></dimensions>;
                                P: <dimensions><width>0.22</width> <height>0.23</height></dimensions>; Q: <dimensions><width>0.12</width> <height>0.12</height></dimensions>, including the left-hand margin of both
                                column and marble slab; R: <dimensions><width>0.11</width> <height>0.10</height></dimensions>, including the left-hand margin of both column and marble slab;
                                S: <dimensions><width>0.06</width> <height>0.06</height></dimensions>, including part of a left-hand margin;
                                T: <dimensions> <width>0.10</width> <height>0.11</height></dimensions>, exhibiting top and left-hand margins of slab; U: <dimensions><width>0.13</width> <height>0.10</height></dimensions>, exhibiting parts of two columns;
                                X: <dimensions><width>0.15</width> <height>0.13</height></dimensions>; Y: <dimensions><width>0.10</width> <height>0.09</height></dimensions>;
                                Ze: <dimensions><width>0.09</width> <height>0.09</height></dimensions>; Zf: <dimensions><width>0.08</width> <height>0.05</height></dimensions>;
                                Zg: <dimensions><width>0.085</width> <height>0.95</height></dimensions>.</p>

                            </support>
                         </supportDesc>
                         <layoutDesc>
                            <layout>Written between lightly incised guidelines, and between vertical margins which define the columns.
                               The largest secion, in two columns, is preserved on fragments A-M; the fragments N-P are from the Preamble; other fragments are Q-Z</layout>
                         </layoutDesc>
                      </objectDesc>
                      <handDesc>
                         <handNote>There are traces of red paint in the letters. A-M: <height>0.017 - 0.02</height>; N: <height>0.06</height>; O: <height>0.022</height>;
                            P: line 1, <height>0.022</height>, lines2 f. <height>0.015</height>; Q-Zg: <height>0.015-0.019</height> </handNote>
                      </handDesc>
                   </physDesc>
                   <history>
                      <origin>
                         <origPlace><ref target="https://www.slsgazetteer.org/986">Street of the Monuments</ref></origPlace>
                         <origDate notBefore="0301" notAfter="0302" evidence="internal dating">301 CE</origDate>
                      </origin>


                            <provenance type="found">
                               <p>
                                  <placeName type="ancientFindspot" ref="https://www.slsgazetteer.org/912">Ptolemais</placeName>:
                                  A-V in the <placeName type="monuList" ref="https://www.slsgazetteer.org/986">Street of the Monuments</placeName> during excavations in <date type="found">1935-36</date>;
                                   X found in fill in Street west of City Baths:; Y found in fill in trench east of city baths;
                                   three further fragments Z.e, Z.f, Z.g
                               </p>
                            </provenance>
                            <provenance type="observed">
                               <p><placeName ref="https://www.slsgazetteer.org/1096">Tolmeita Museum</placeName>.</p>
                            </provenance>


                   </history>
                </msDesc>
             </sourceDesc>
          </fileDesc>
          <encodingDesc>
             <p>Marked-up according to the EpiDoc Guidelines version 8</p>
          <classDecl><taxonomy><category xml:id="photograph"><catDesc>Digital or digitized photographs</catDesc></category><category xml:id="representation"><catDesc>Digitized other representations</catDesc></category></taxonomy></classDecl></encodingDesc>
          <profileDesc>
             <langUsage>
                <language ident="ar">Arabic</language>
                <language ident="en">English</language>
                <language ident="fr">French</language>
                <language ident="de">German</language>
                <language ident="grc">Ancient Greek</language>
                <language ident="grc-Latn">Transliterated Greek</language>
                <language ident="el">Modern Greek</language>
                <language ident="he">Hebrew</language>
                <language ident="it">Italian</language>
                <language ident="la">Latin</language>
             </langUsage>
             <textClass/>
             <textClass>
                <keywords scheme="IRCyr">
                   <term>
                            <geogName type="ancientRegion" key="Cyrene">Cyrenaica</geogName>
                        </term>
                   <term>
                            <geogName type="modernCountry" key="LY">Libya</geogName>
                        </term>
                   <term>
                            <placeName type="modernFindspot" ref="http://sws.geonames.org/82972">Shahat</placeName>
                        </term>
                </keywords>
             </textClass>
          <creation>From transcription and previous publications (Reynolds)</creation></profileDesc>
          <revisionDesc>
             <change when="2020-11-24" who="Irene">inserted lemmata and normalized Unicode</change>
             <change when="2012-11-05" who="GB">moved text-constituted-from to profileDesc/creation</change>
             <change when="2012-10-16" who="GB">broke provenance events into multiple provenance elements</change>
             <change when="2012-03-28" who="SS">Created from template</change>
          </revisionDesc>
       </teiHeader><facsimile><!--Dept. F. 372.--><surface/></facsimile>
       <text>
          <body>
             <div type="bibliography">
                <head>Bibliography</head>
                <p>Fragments A-V: Published <bibl><ptr target="caputo-rgg1955"/><citedRange></citedRange></bibl>, whence <bibl><ptr target="AE"/> <citedRange>1956.113</citedRange></bibl>.
                   X-Y: Published <bibl><ptr target="kraeling1962"/>, <citedRange>47, a and b</citedRange></bibl>;
                   Z.e-g published, and other fragments revised in brief by <bibl><ptr target="jmr1970"/><citedRange></citedRange></bibl>,
                   and, more fully, <bibl><ptr target="jmr1971"/><citedRange></citedRange></bibl>; from these <bibl><ptr target="lauffer1971"/>, <citedRange>Ptolemais I-XVI</citedRange></bibl>.
                   Discussed by M. H. Crawford (forthcoming with the publication of the copy of the edict from Aphrodisias).  Mentioned <bibl><ptr target="kenrick2013"/>, <citedRange>103</citedRange></bibl></p>

             </div>

             <div type="edition" xml:lang="la" xml:space="preserve">
                <div subtype="section" type="textpart" n="N">
       <ab>
    <lb n="0"/><note>Part of the first two lines of the Imperial titles, immediately preceding the Preamble</note>
    <lb n="1"/><gap reason="lost" extent="unknown" unit="character"/> <persName type="emperor" key="diocletianus"><supplied reason="lost"><name nymRef="Diocletianus">Diocletianus</name></supplied> <w lemma="pius"><expan><abbr>P</abbr><ex>ius</ex></expan></w> <w lemma="felix"><expan><abbr>F</abbr><ex>elix</ex></expan></w> <w lemma="inuictus"><expan><abbr>inu</abbr><ex>ictus</ex></expan></w> <supplied reason="lost"><name nymRef="Augustus"><expan><abbr>Aug</abbr><ex>ustus</ex></expan></name> <w lemma="pontifex"><expan><abbr>pont</abbr><ex>ifex</ex></expan></w> <w lemma="maximus"><expan><abbr>max</abbr><ex>imus</ex></expan></w></supplied></persName> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="2"/><gap reason="lost" extent="unknown" unit="character"/> <del rend="erasure"><w lemma="et">et</w></del> <persName type="emperor" key="maximianus"><del rend="erasure"><w lemma="imperator"><expan><abbr>im<supplied reason="lost">p</supplied></abbr><supplied reason="lost"><ex>erator</ex></supplied></expan></w></del> <supplied reason="lost"><del rend="erasure"><name nymRef="Caesar">Caesar</name></del> <note>Maximianus</note></supplied></persName> <gap reason="lost" extent="unknown" unit="character"/>
    <gap reason="lost" extent="unknown" unit="line"/>
    </ab></div>
          <div subtype="section" type="textpart" n="O">
       <ab>
    <lb n="0"/><note>Preamble, II.22</note>
          <gap reason="lost" extent="unknown" unit="line"/>
    <lb n="1"/><gap reason="lost" extent="unknown" unit="character"/><supplied reason="lost"><w lemma="species">species</w></supplied> <w lemma="uictus">uictu<supplied reason="lost">i</supplied></w> <supplied reason="lost"><w lemma="adque">adque</w> <w lemma="usus">usui</w></supplied> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="2"/> <w lemma="temperamentum"><supplied reason="lost">temperamen</supplied>tum</w> <w lemma="existumo">ex<supplied reason="lost">istumauerit</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="3"/><gap reason="lost" extent="unknown" unit="character"/><supplied reason="lost"><w lemma="sum">esse</w></supplied> <w lemma="debeo"><supplied reason="lost">deb</supplied>eat</w> <w lemma="infero">infe<supplied reason="lost">rentis</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <gap reason="lost" extent="unknown" unit="line"/>
    </ab></div>
          <div subtype="section" type="textpart" n="P">
       <ab>
          <lb n="0"/><note>Preamble, II.26, and Chapter I, lines 14-18</note>
    <gap reason="lost" extent="unknown" unit="line"/>
    <lb n="1"/><gap reason="lost" extent="unknown" unit="character"/> <w lemma="mitigo"><supplied reason="lost">mitigar</supplied>e</w> <w lemma="aut">aut</w> <w lemma="satio">satiare</w> <w lemma="possum">p<supplied reason="lost">otuerunt</supplied></w>
    <lb n="2"/> <space extent="1" unit="line"/>
          <lb n="3"/> <space extent="1" unit="line"/>
    <lb n="4"/> <w lemma="unus">unum</w> <g ref="symbols.xml#denarius"/> <w lemma="sexaginta">sexagin<supplied reason="lost">ta</supplied></w>
    <lb n="5"/> <w lemma="unus"><supplied reason="lost">un</supplied>um</w> <g ref="symbols.xml#denarius"/> <w lemma="centum">centum</w>
    <lb n="6"/><supplied reason="lost"><w lemma="unus">unum</w></supplied> <g ref="symbols.xml#denarius"/> <w lemma="centum">centum</w>
    <lb n="7"/><supplied reason="lost"><w lemma="unus">unum</w> <g ref="symbols.xml#denarius"/></supplied> <w lemma="triginta">triginta</w>
    <lb n="8"/><supplied reason="lost"><w lemma="unus">unum</w> <g ref="symbols.xml#denarius"/></supplied> <w lemma="centum"><supplied reason="lost">ce</supplied>ntum</w>
       <gap reason="lost" extent="unknown" unit="line"/></ab>
    </div>
                <div subtype="section" type="textpart" n="V">
       <ab>
        <lb n="0"/><note>Chapter I, lines 21-23</note>
          <gap reason="lost" extent="unknown" unit="line"/>
    <lb n="1"/> <w lemma="fasiolum"><supplied reason="lost">Fasi</supplied><unclear>o</unclear>li</w> <w lemma="siccus">s<supplied reason="lost">icci</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="2"/><supplied reason="lost"><w lemma="linum">Lini</w></supplied> <w lemma="semen">semi<supplied reason="lost">nis</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="3"/> <w lemma="oryza"><supplied reason="lost">oryza</supplied>e</w> <w lemma="mundus">mun<supplied reason="lost">dae</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <gap reason="lost" extent="unknown" unit="line"/>
    </ab>
    </div>
    <div subtype="section" type="textpart" n="X">
       <ab><lb n="0"/><note>Chapter V, lines 1a-4</note>
          <gap reason="lost" extent="unknown" unit="line"/>
      <lb n="1"/><supplied reason="lost"><w lemma="piscis">piscis</w> <w lemma="aspratilis">aspratilis</w> <w lemma="marinus">marini</w> <placeName type="ethnic" nymRef="#Italicus" ref="#italia"><expan><abbr>Ital</abbr><ex>icum</ex></expan></placeName> <w lemma="pondus"><expan><abbr>po</abbr><ex>ndo</ex></expan></w></supplied> <w lemma="unus"><supplied reason="lost">unu</supplied>m</w> <g ref="symbols.xml#denarius"/> <w lemma="uiginti">uiginti</w>
      <lb n="2"/><supplied reason="lost"> <w lemma="quattuor">quattuor</w></supplied> <space extent="1" unit="line"/>
       <lb n="3"/><supplied reason="lost"><w lemma="piscis">piscis</w> <w lemma="secundus">secundi</w> <space extent="6" unit="character"/> <placeName type="ethnic" nymRef="#Italicus" ref="#italia"><expan><abbr>Ital</abbr><ex>icum</ex></expan></placeName> <w lemma="pondus"><expan><abbr>po</abbr><ex>ndo</ex></expan></w> <w lemma="unus">unum</w> <g ref="symbols.xml#denarius"/> </supplied> <w lemma="sedecim"><supplied reason="lost">sed</supplied>ecim</w>
      <lb n="4"/><supplied reason="lost"><w lemma="piscis">piscis</w> <w lemma="fluuialis">flubialis</w> <w lemma="optimus">optimi</w> <placeName type="ethnic" nymRef="#Italicus" ref="#italia"><expan><abbr>Ital</abbr><ex>icum</ex></expan></placeName> <w lemma="pondus"><expan><abbr>po</abbr><ex>ndo</ex></expan></w> <w lemma="unus">unum</w> <g ref="symbols.xml#denarius"/></supplied> <w lemma="duodecim"><supplied reason="lost">d</supplied>uodecim</w>
       <lb n="5"/><supplied reason="lost"><w lemma="piscis">piscis</w> <w lemma="secundus">secundi</w> <w lemma="fluuialis">flubialis</w> <placeName type="ethnic" nymRef="#Italicus" ref="#italia"><expan><abbr>Ital</abbr><ex>icum</ex></expan></placeName> <w lemma="pondus"><expan><abbr>po</abbr><ex>ndo</ex></expan></w> <w lemma="unus">unum</w> <g ref="symbols.xml#denarius"/> </supplied> <w lemma="octo"><supplied reason="lost">o</supplied>cto</w>
          <gap reason="lost" extent="unknown" unit="line"/>
    </ab>
    </div>
                <div subtype="section" type="textpart" n="Z.e">
       <ab><lb n="0"/><note>Chapter XII (Crawford Chapter 23), lines 3-4</note>
          <gap reason="lost" extent="unknown" unit="line"/>
          <lb n="1"/><supplied reason="lost"><w lemma="cubitum">cubitorum</w> <w lemma="numerus"><expan><abbr>n</abbr><ex>umero</ex></expan></w> <w lemma="quadraginta">quadraginta</w> <w lemma="latitudo">latitudinis</w> <w lemma="suprascribo"><expan><abbr>s</abbr><ex>upra</ex><abbr>s</abbr><ex>criptae</ex></expan></w></supplied> <g ref="symbols.xml#denarius"/> <w lemma="triginta">trigin<supplied reason="lost">ta</supplied></w> <supplied reason="lost"><w lemma="mille">milibus</w></supplied>
          <lb n="2"/><supplied reason="lost"><w lemma="cubitum">cubitorum</w> <w lemma="numerus"><expan><abbr>n</abbr><ex>umero</ex></expan></w> <w lemma="triginta">triginta</w> <w lemma="quinque">quinque</w></supplied> <w lemma="latitudo"><supplied reason="lost">latitudi</supplied>nis</w> <w lemma="per">per</w> <w lemma="quadra">q<supplied reason="lost">uadrum</supplied></w> <supplied reason="lost"><w lemma="digitus">digitorum</w> <w lemma="octoginta">octoginta</w> <g ref="symbols.xml#denarius"/> <w lemma="duodecim">duodecim</w> <w lemma="mille">milibus</w></supplied>
          <gap reason="lost" extent="unknown" unit="line"/>
    </ab>
    </div>
                <div subtype="section" type="textpart" n="R">
       <ab>
     <note>From Chapter XV (Crawford Chapter 36)</note>
          <gap reason="lost" extent="unknown" unit="line"/>
    <lb n="1"/> <w lemma="aeramentum">ae<supplied reason="lost">ramentum</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="2"/> <w lemma="aeramentum">aerame<supplied reason="lost">ntum</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="3"/> <w lemma="aeramentum">aeram<supplied reason="lost">entum</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="4"/> <w lemma="aeramentum">aer<supplied reason="lost">amentum</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <gap reason="lost" extent="unknown" unit="line"/>
    </ab>
    </div>
                <div subtype="section" type="textpart" n="A-N, I, Col. 1"><ab>
                <lb n="0"/><note>Chapter XIX (Crawford Chapter 49), lines 11 to 36</note> <gap reason="lost" extent="unknown" unit="line"/>

    <lb n="1"/><note>11</note> <w lemma="sex"><supplied reason="lost">s</supplied>ex</w> <w lemma="mille">milibus</w>

    <lb n="2"/><note>12</note> <w lemma="dalmaticomafortium"><supplied reason="lost">Dalmaticomafor</supplied>tium</w> <w lemma="subsericus">subseri<supplied reason="lost">c</supplied>um</w> <w lemma="alvus">aluum</w> <w lemma="clavo">clavans</w> <w lemma="purpura"><expan><abbr>purpu<supplied reason="lost">r</supplied></abbr><supplied reason="lost"><ex>ae</ex></supplied></expan></w>

    <lb n="3"/><supplied reason="lost"> <space extent="8" unit="character"/></supplied> <w lemma="hypoblattus"><supplied reason="lost">hy</supplied>poblattae</w> <w lemma="libra">l<supplied reason="lost">ibra</supplied>m</w> <w lemma="unus">unam</w> <g ref="symbols.xml#denarius"/> <num><w lemma="quadraginta">quadraginta</w> <w lemma="quattuor">qu<supplied reason="lost">at</supplied><lb
       n="4" break="no"/><supplied reason="lost"><space extent="20" unit="character"/></supplied><supplied reason="lost">tu</supplied>or</w> <w lemma="mille">milibus</w></num> <space extent="12" unit="character"/>

    <lb n="5"/><note>13 a-b</note>  <w lemma="dalmaticomafortium"><supplied reason="lost">Dalmat</supplied>icoma<supplied reason="lost">fortium</supplied></w> <placeName type="ethnic" nymRef="#Mutinensis" ref="#mutina"><supplied reason="lost">Mutinen</supplied>se</placeName> <w lemma="subsericus">subsericum</w> <w lemma="clavo">clavan<supplied reason="lost">s</supplied></w>

    <lb n="6"/> <supplied reason="lost"><space extent="2" unit="character"/></supplied> <w lemma="purpura"><supplied reason="lost">pur</supplied>purae</w> <w lemma="hypoblattus">hypoblat<supplied reason="lost">tae</supplied></w> <w lemma="libra"><supplied reason="lost">libram</supplied></w> <w lemma="unus"><supplied reason="lost">u</supplied>nam</w> <g ref="symbols.xml#denarius"/> <w lemma="quadraginta">quadraginta</w> <w lemma="sex">sex</w> <w lemma="mille"><supplied reason="lost">milibu</supplied>s</w>

    <lb n="7"/><note>14 c</note> <w lemma="dalmaticomafortium"><supplied reason="lost">Dalmatic</supplied>omafortium</w> <w lemma="marinus">marinum</w> <w lemma="subsericus">subsericum</w> <w lemma="ut">ut</w> <w lemma="supra"><expan><abbr>s</abbr><ex>upra</ex></expan></w> <g ref="symbols.xml#denarius"/> <num><w lemma="quadraginta">qu<supplied reason="lost">adra</supplied><lb
       n="8" break="no"/><space extent="28" unit="character"/>ginta</w> <w lemma="octo">octo</w> <w lemma="mille">mi<supplied reason="lost">libus</supplied></w></num>

    <lb n="9"/><note>15 d-e</note> <supplied reason="lost"><w lemma="dalmatica">Dalmatica</w></supplied> <w lemma="holosericus">holoserica</w> <w lemma="uirilis">uirilis</w> <w lemma="clavo">clavans</w> <w lemma="purpura"><expan><abbr>purpur</abbr><ex>ae</ex></expan></w> <w lemma="blatta">blattae</w> <gap reason="lost" extent="2" unit="character"/> <w lemma="libra"><expan><abbr><unclear>li</unclear>br</abbr><ex>am</ex></expan></w> <g ref="symbols.xml#denarius"/> <lb n="10"/> <space extent="30" unit="character"/><num><w lemma="quinquaginta">quinqua<supplied reason="lost">ginta</supplied></w> <w lemma="mille"><supplied reason="lost">mil</supplied>ibus</w></num>

    <lb n="11"/><note>16 f</note>  <w lemma="dalmaticomafortium"><supplied reason="lost">Dalmati</supplied>comafortium</w> <w lemma="holosericus">holosericum</w> <w lemma="alvus">aluum</w> <w lemma="clavo">clav<supplied reason="lost">ans</supplied></w> <w lemma="purpura"><supplied reason="lost">purpur</supplied>ae</w>

    <lb n="12"/><supplied reason="lost"> <space extent="4" unit="character"/></supplied><w lemma="libra"><supplied reason="lost">lib</supplied><unclear>ras</unclear></w> <w lemma="duo">duas</w> <g ref="symbols.xml#denarius"/> <num><w lemma="centum">centum</w> <w lemma="triginta">triginta</w> <w lemma="quinque">quin<supplied reason="lost">que</supplied></w> <w lemma="mille"><supplied reason="lost">milibus</supplied></w></num>

    <lb n="13"/><note>17 g-h</note> <supplied reason="lost"><w lemma="item">item</w> <w lemma="de">de</w> <w lemma="alius">aliis</w></supplied> <w lemma="infectus">infectis</w> <w lemma="eadem">eadem</w> <w lemma="holosericus">h<supplied reason="lost">olo</supplied>seric<supplied reason="lost">a</supplied></w>  <w lemma="habeo"><supplied reason="lost">habit</supplied>a</w>

    <lb n="14"/> <space extent="22" unit="character"/>  <w lemma="ratio">ratione</w> <w lemma="tingo">tin<supplied reason="lost">cturae</supplied></w>  <supplied reason="lost"> <w lemma="sic">sic</w> <w lemma="distraho">distrahi</w></supplied> <w lemma="debeo"><supplied reason="lost">deben</supplied>t</w>

    <lb n="15"/><note>18, i</note> <w lemma="strictoria"><supplied reason="lost">S</supplied>tricto<supplied reason="lost">ria</supplied></w> <w lemma="holosericus"><supplied reason="lost">holoseric</supplied>a</w> <w lemma="clavo">clavans</w> <w lemma="purpura">purpu<supplied reason="lost">rae</supplied></w> <gap reason="lost" extent="unknown" unit="character"/> <supplied reason="lost"><w lemma="uncia">uncias</w></supplied> <w lemma="sex"><supplied reason="lost">se</supplied>x</w>

    <lb n="16"/> <space extent="24" unit="character"/><g ref="symbols.xml#denarius"/> <w lemma="quadraginta"><supplied reason="lost">qu</supplied>adragi<supplied reason="lost">nta</supplied></w> <gap reason="lost" extent="unknown" unit="character"/> <supplied reason="lost"><w lemma="mille">milibus</w></supplied>

    <lb n="17"/><note>19, k</note> <supplied reason="lost"><w lemma="asema">Asema</w></supplied> <w lemma="holosericus">holo<supplied reason="lost">serica</supplied></w> <gap reason="lost" extent="unknown" unit="character"/> <g ref="symbols.xml#denarius"/> <w lemma="quadraginta">qu<supplied reason="lost">adraginta</supplied></w> <supplied reason="lost"><w lemma="quinque">quinque</w> <w lemma="mille">milibus</w></supplied>

    <lb n="18"/><note>20, l-n</note> <supplied reason="lost"><w lemma="episema">episemae</w> <w lemma="secundus">secundum</w></supplied>
                   <w lemma="qualitas"><supplied reason="lost">qualit</supplied>ate<supplied reason="omitted">m</supplied></w> <w lemma="lana">lana<supplied reason="lost">e</supplied></w> <supplied reason="lost"><w lemma="pondus">pondus</w> <w lemma="aurum">auri</w></supplied> <w lemma="et">et</w>
    <lb n="19"/><supplied cert="low" reason="lost"><w lemma="habeo">habita</w> <w lemma="ratio">ratione</w> <w lemma="mensura">mensurae</w> <w lemma="aurum">auri</w></supplied> <w lemma="et">et</w> <w lemma="plumaturus">plumatur<supplied reason="lost">ae</supplied></w> <w lemma="distraho"><supplied reason="lost">distr</supplied>ahi</w>
    <lb n="20"/> <space extent="25" unit="character"/>  <w lemma="possum">poterunt</w>  <space extent="15" unit="character"/>
    <lb n="21"/> <note>21, o-p</note> <supplied reason="lost"><w lemma="chlamys">Chlamys</w></supplied> <placeName type="ethnic" nymRef="#Mutinensis" ref="#mutina"><supplied reason="lost">Mutin</supplied>ens<supplied reason="lost">is</supplied></placeName> <w lemma="duplex"><supplied reason="lost">dupl</supplied>ex</w> <w lemma="clavo">clavans</w> <supplied reason="lost"><w lemma="haplius">hapliae</w></supplied> <w lemma="secundus"><supplied reason="lost">sec</supplied>un<lb
       n="22" break="no"/><supplied reason="lost"><space extent="8" unit="character"/></supplied><supplied reason="lost" cert="low">dae</supplied></w> <w lemma="uncia"><supplied reason="lost">un</supplied>cias</w> <gap reason="lost" extent="10" unit="character"/> <g ref="symbols.xml#denarius"/> <w part="I"><unclear>d</unclear></w><gap reason="lost" extent="25" unit="character"/>
    <lb n="23"/><note>22, q</note> <w lemma="autem">Autem</w> <w lemma="clavo"><unclear>c</unclear><supplied reason="lost">lavantes</supplied></w> <w part="I">p</w><gap reason="lost" extent="10" unit="character"/><orig>ui</orig><gap reason="lost" extent="14" unit="character"/><orig>i</orig>
    <lb n="24"/> <space extent="12" unit="character"/>  <gap reason="lost" extent="15" unit="character"/>  <w part="I" lemma="purpura"><supplied reason="lost">p</supplied>urp<supplied reason="lost">urae</supplied></w> <w lemma="distraho"><supplied reason="lost">distrahunt</supplied>ur</w>
    <lb n="25"/><note>23, r</note> <w lemma="chlamys"><supplied reason="lost">Ch</supplied>lamys</w> <placeName type="ethnic" nymRef="#Mutinensis" ref="#mutina">Mutin<supplied reason="lost">ensis</supplied></placeName> <supplied reason="lost"><w lemma="simplex">simplex</w></supplied> <w lemma="clavo"><supplied reason="lost">cla</supplied>van<supplied reason="lost">s</supplied></w> <supplied reason="lost" cert="low"><w lemma="purpura">purpurae</w></supplied> <gap reason="lost" extent="6" unit="character"/>

    <lb n="26"/> <space extent="8" unit="character"/> <w lemma="uncia">unc<supplied reason="lost">ias</supplied></w> <w lemma="quinque">quin<supplied reason="lost" cert="low">que</supplied></w> <gap reason="lost" extent="22" unit="character"/>

    <lb n="27"/><note>24, s</note>  <w lemma="fibulatorium"><supplied reason="lost">Fi</supplied>bulatorium</w> <placeName type="ethnic" nymRef="#Mutinensis" ref="#mutina">Mu<supplied reason="lost">tinen</supplied>se</placeName> <w lemma="simplex">sim<supplied reason="lost">plex</supplied></w> <gap reason="lost" extent="7" unit="character"/>  <supplied reason="lost"><w lemma="clavo">clavans</w></supplied> <w lemma="purpura"><supplied reason="lost">purpura</supplied>e</w>

    <lb n="28"/><supplied reason="lost"> <space extent="8" unit="character"/></supplied><w lemma="haplius">hapli<supplied reason="lost">ae</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>

    <lb n="29"/><note>25, t</note> <w lemma="fibulatorium"><supplied reason="lost">Fib</supplied>ulatorium</w> <placeName type="ethnic" nymRef="#Ladicenus" ref="#laodicea">L<supplied reason="lost">adicenum</supplied></placeName> <supplied reason="lost"><w lemma="simplex">simplex</w></supplied> <w lemma="ex"><supplied reason="lost">e</supplied>x</w> <w lemma="lana">lani<supplied reason="lost">s</supplied></w> <placeName type="ethnic" nymRef="#Mutinensis" ref="#mutina"><supplied reason="lost">Mutinen</supplied>si<lb
       n="30" break="no"/><space extent="3" unit="character"/>bus</placeName> <w lemma="et">et</w> <placeName type="ethnic" nymRef="#Ladicenus" ref="#laodicea">Ladicenis</placeName> <w lemma="haplius">hapliae</w> <w lemma="clavo"><supplied reason="lost">clavan</supplied>s</w> <w lemma="uncia">uncias</w> <w lemma="quattuor">quattuor</w> <g ref="symbols.xml#denarius"/> <w lemma="quadraginta"><supplied reason="lost">quadragint</supplied>a</w>

    <lb n="31"/><note>26, u-v</note> <w lemma="chlamys"><supplied reason="lost">Chl</supplied>amys</w> <w lemma="simplex">simplex</w> <w lemma="ex">ex</w> <w lemma="lana">l<supplied reason="lost">anis</supplied></w> <placeName type="ethnic" nymRef="#Mutinensis" ref="#mutina"><supplied reason="lost">Muti</supplied>nensibus</placeName> <w lemma="et">et</w> <placeName type="ethnic" nymRef="#Ladicenus" ref="#laodicea">Ladiceni<supplied reason="lost">s</supplied></placeName> <supplied reason="lost"><w lemma="clavo">clavans</w> <w lemma="haplius">hapliae</w></supplied>

    <lb n="32"/> <space extent="8" unit="character"/> <w lemma="uncia">unc<supplied reason="lost">ias</supplied></w> <gap reason="lost" extent="8" unit="character"/> <supplied reason="lost"><g ref="symbols.xml#denarius"/></supplied> <w lemma="quindecim">quindecim</w> <w lemma="mille">milib<supplied reason="lost">us</supplied></w>

    <lb n="33"/> <note>27, w</note> <w lemma="fibulatorium"><supplied reason="lost">Fib</supplied>ulatoriu<supplied reason="lost">m</supplied></w> <placeName type="ethnic" nymRef="#Ladicenus" ref="#laodicea"><supplied reason="lost">Ladicen</supplied>um</placeName> <w lemma="clavo">clavans</w> <w lemma="purpura">purpu<supplied reason="lost">rae</supplied></w> <gap reason="lost" extent="7" unit="character"/> <w lemma="primus">primae</w>

    <lb n="34"/> <space extent="8" unit="character"/> <w lemma="uncia">un<supplied reason="lost">cias</supplied></w> <w lemma="quattuor"><supplied reason="lost">qu</supplied>attuor</w> <g ref="symbols.xml#denarius"/> <w lemma="quattuor">quatt<supplied reason="lost">uor</supplied></w> <w lemma="mille">milib<supplied reason="lost">u</supplied>s</w>

    <lb n="35"/><note>28, 17</note>  <w lemma="tapete"><supplied reason="lost">Tap</supplied>ete</w> <placeName type="ethnic" nymRef="#Britanicus" ref="#britannia">Britannic<supplied reason="lost">u</supplied>m</placeName> <w lemma="primus"><expan><abbr>prim</abbr><ex>ae</ex></expan></w> <w lemma="forma">form<supplied reason="lost">ae</supplied></w> <supplied reason="lost"><g ref="symbols.xml#denarius"/></supplied> <w lemma="quinque"><supplied reason="lost">quinqu</supplied>e</w> <w lemma="mille">mili<supplied reason="lost">b</supplied>us</w>

    <lb n="36"/> <note>29, 18</note><supplied reason="lost"> <space extent="2" unit="character"/></supplied><w lemma="forma"><supplied reason="lost">For</supplied>ma<supplied reason="lost">e</supplied></w> <w lemma="secundus">secundae</w> <space extent="5" unit="character"/><supplied reason="lost" cert="low"><g ref="symbols.xml#denarius"/> <w lemma="quattuor">quattuor</w></supplied> <w lemma="mille">milibus</w>

    <lb n="37"/> <note>30, 19</note><supplied reason="lost"><w lemma="tapete">Tapete</w></supplied> <placeName type="ethnic" nymRef="#Cappadocicus" ref="#cappadocia"><supplied reason="lost">Cappa</supplied>docicum</placeName> <w lemma="siue">siu<supplied reason="lost">e</supplied></w> <supplied reason="lost"><placeName type="ethnic" nymRef="#Ponticus" ref="#pontus">Ponticum</placeName></supplied> <w lemma="forma">formae</w> <w lemma="primus"><expan><abbr><supplied reason="lost" cert="low">pr</supplied>im</abbr><ex>ae</ex></expan></w> <g ref="symbols.xml#denarius"/> <w lemma="tres">tribus</w> <w lemma="mille">milibus</w>

    <lb n="38"/><note>31, 20</note> <supplied reason="lost"> <space extent="2" unit="character"/></supplied><supplied reason="lost"><w lemma="forma">Formae</w></supplied> <w lemma="secundus"><supplied reason="lost">secun</supplied>dae</w> <space extent="6" unit="character"/><supplied reason="lost"><g ref="symbols.xml#denarius"/></supplied> <w lemma="duo"><supplied reason="lost" cert="low">duobu</supplied>s</w>  <w lemma="mille">milibus</w>

    <lb n="39"/><note>32, 21</note> <supplied reason="lost"><w lemma="tapete">Tapete</w></supplied> <placeName type="ethnic" nymRef="#Aegyptius" ref="#egypt"><supplied reason="lost">Aegyptiu</supplied>m</placeName> <space extent="3" unit="character"/><supplied reason="lost"><g ref="symbols.xml#denarius"/> <w lemma="mille">mille</w> <w lemma="septingenti">septingentis</w></supplied> <w lemma="quinquaginta">quinquaginta</w>

    <lb n="40"/><note>33, 22</note> <supplied reason="lost"><w lemma="tapete">Tapete</w> <w lemma="cavallaricus">cavallaricum</w> <g ref="symbols.xml#denarius"/></supplied> <w lemma="quadringenti"><supplied reason="lost">quadri</supplied>nge<supplied reason="lost">ntis</supplied></w>

    <lb n="41"/><note>34, 23</note> <supplied reason="lost"><w lemma="tapete">Tapete</w></supplied> <w lemma="accubitalis"><supplied reason="lost">accubital</supplied>e</w> <w lemma="singulus">s<supplied reason="lost">ingulum</supplied></w> <supplied reason="lost"><space extent="2" unit="character"/></supplied> <g ref="symbols.xml#denarius"/> <num><w lemma="quattuor">quat<supplied reason="lost">tuor</supplied></w> <supplied reason="lost"><w lemma="mille">milibus</w></supplied> <w lemma="quingenti"><supplied reason="lost">q</supplied>uingentis</w></num>

    <lb n="42"/><note>35, 24</note> <supplied reason="lost"><w lemma="tapete">Tapete</w> <placeName type="ethnic" nymRef="#Africanus" ref="#africa">Africanum</placeName></supplied> <space extent="12" unit="character"/><g ref="symbols.xml#denarius"/> <num><w lemma="millequingenti">milleq<supplied reason="lost">uingentis</supplied></w>
     </num>
    <lb n="43"/><note>36, 25</note> <supplied reason="lost" cert="low"><w lemma="stragulum">Stragula</w> <w lemma="secundus">secundum</w> <w lemma="pondus">pondus</w></supplied> <w lemma="plumaturus"><supplied reason="lost">pl</supplied>umatu<supplied reason="lost">rae</supplied></w> <supplied reason="lost"><w lemma="et">et</w> <w lemma="lana">lanae</w></supplied> <w lemma="distraho"><supplied reason="lost">di</supplied>strahi</w>

    <lb n="44"/> <space extent="25" unit="character"/>  <supplied reason="lost"><w lemma="debeo">debent</w></supplied>  <space extent="15" unit="character"/>

    </ab></div>
     <div subtype="section" type="textpart" n="M">
       <ab>
    <lb n="0"/><note>XIX, 43-53: Crawford Chapter 49, lines 40-46</note>
    <lb n="1"/><supplied reason="lost"><w lemma="paragouda">paragaudae</w> <placeName type="ethnic" nymRef="#Laodicenus" ref="#laodicea">Laodicenae</placeName> <w lemma="addo">addito</w> <w lemma="pretium">pretio</w>
       <w lemma="purpura">purpurae</w> <w lemma="reliquus">reliqua</w></supplied> <w lemma="inputo">in<supplied reason="lost">putanda</supplied></w> <supplied reason="lost"><w lemma="sum">sunt</w></supplied>
    <lb n="2"/><supplied reason="lost"><w lemma="byrrus">byrrus</w> <placeName type="ethnic" nymRef="#Nerbicus" ref="#nervii" >Nerbicus</placeName> <w lemma="leoninus">leoninus</w> <w lemma="optimus">optimus</w> <space extent="unknown"/></supplied> <g ref="symbols.xml#denarius"/> <w part="I">quin<supplied reason="lost">decim</supplied></w> <supplied reason="lost"><w lemma="mille">milibus</w>
     <lb n="3"/><supplied reason="lost"><w lemma="byrrus">byrrus</w> <w lemma="Taurogastricus">Taurogastricus</w> <space extent="unknown"/></supplied>  <g ref="symbols.xml#denarius"/> <w part="I">duodecim</w></supplied>
    <lb n="4"/> <supplied reason="lost"><w lemma="byrrus">byrrus</w> <placeName type="ethnic" nymRef="#Ripensis" ref="#ripensis" >Ripensis</placeName> <space extent="unknown"/></supplied> <g ref="symbols.xml#denarius"/> <w lemma="octo">octo</w> <w lemma="mille">mil<supplied reason="lost">ibus</supplied></w>
    <lb n="5"/><supplied reason="lost"><w lemma="byrrus">byrrus</w> <placeName type="ethnic" nymRef="#Noricus" ref="#noricum">Noricus</placeName> <space extent="unknown"/></supplied> <g ref="symbols.xml#denarius"/> <w lemma="decem">decem</w> <w lemma="mille">milibu<supplied reason="lost">s</supplied></w>
    <lb n="6"/><supplied reason="lost"><w lemma="byrrus">byrrus</w> <placeName type="ethnic" nymRef="#Britanicus" ref="#britannia">Britannicus</placeName> <space extent="unknown"/></supplied> <g ref="symbols.xml#denarius"/> <w lemma="sex">sex</w> <w lemma="mille">milibus</w>
     <lb n="7"/><supplied reason="lost"><w lemma="byrrus">byrrus</w> <w lemma="Meditomagensis">Meditomagensis</w> <space extent="unknown"/></supplied> <g ref="symbols.xml#denarius"/> <w lemma="sex">sex</w> <w lemma="mille">milibus</w>
    <lb n="0"/><gap reason="lost" extent="unknown" unit="line"/>
    </ab></div>
                <div subtype="section" type="textpart" n="A-N, I, Col. 2">
       <ab><lb n="0"/><note>Chapter  XIX, line 74 - Chapter XXII, line 17: Crawford Chapter 49, line 73-Chapter 52, line 17</note>
    <lb n="1"/><note>74 = 63</note> <w lemma="dalmaticomafortium"><supplied reason="lost">D</supplied>almaticomafortium</w> <w lemma="leporinus">leporinum</w> <w lemma="clavo">clavans</w> <supplied reason="lost"><w lemma="purpura">purpurae</w></supplied>
    <lb n="2"/> <space extent="8" unit="character"/> <w lemma="pondus"><expan><abbr>po</abbr><ex>ndum</ex></expan></w> <w lemma="unus">unum</w> <w lemma="semis">semis</w> <g ref="symbols.xml#denarius"/> <w lemma="septem">septem</w> <w lemma="mille"><supplied reason="omitted">m</supplied>i<supplied reason="lost">libus</supplied></w>
    <note>Chapter XX</note>
          <lb n="3"/> <supplied reason="lost"><w lemma="de">De</w></supplied> <w lemma="merces"><supplied reason="lost">mercedi</supplied>bus</w> <w lemma="plumarius">plumariorum</w> <w lemma="et">et</w> <w lemma="sericarius">sericarioru<supplied reason="lost">m</supplied></w>
    <lb n="4"/><note>1a</note> <w lemma="plumarius"><supplied reason="lost">Plumari</supplied>o</w> <w lemma="in">in</w> <w lemma="strictoria">strictoria</w> <w lemma="subsericus">subserica</w> <w lemma="pro">pro</w> <w lemma="uncia">uncia</w> <supplied reason="lost"><w lemma="unus">una</w> <g ref="symbols.xml#denarius"/> <w lemma="ducenti">ducentos</w></supplied>
    <lb n="5"/><note>2</note> <w lemma="in">In</w> <w lemma="strictoria">strictoria</w> <w lemma="holosericus">holoserica</w> <w lemma="per">per</w> <w lemma="singulus">singulas</w> <w lemma="uncia">unc<supplied reason="lost">ias</supplied></w> <supplied reason="lost"><g ref="symbols.xml#denarius"/></supplied> <w lemma="trecenti"><supplied reason="lost">trecen</supplied>tos</w>
    <lb n="6"/><note>3</note> <w lemma="in">In</w> <w lemma="chlamys">chlamydem</w> <placeName type="ethnic" nymRef="#Mutinensis" ref="#mutina">Mutinensi</placeName> <w lemma="in">in</w> <w lemma="uncia">uncia</w> <w lemma="unus">una</w> <g ref="symbols.xml#denarius"/> <w lemma="uiginti">uiginti</w> <w lemma="quinque">quinque</w>
    <lb n="7"/> <note>4</note> <w lemma="in">In</w> <w lemma="chlamys">chlamydem</w> <placeName type="ethnic" nymRef="#Ladicenus" ref="#laodicea">Ladicena</placeName> <w lemma="ut">ut</w> <w lemma="supra"><expan><abbr>s</abbr><ex>upra</ex></expan></w> <w lemma="in">in</w> <w lemma="uncia">uncia</w> <w lemma="unus">una</w> <g ref="symbols.xml#denarius"/> <w lemma="uiginti">uigi<supplied reason="lost">n</supplied>ti</w> <w lemma="quinque">quinque</w>
    <lb n="8"/> <note>5</note> <w lemma="barbaricarius">Barbaricario</w> <w lemma="ex">ex</w> <w lemma="aurum">a<supplied reason="lost">u</supplied>ro</w> <w lemma="facio">faciente</w> <w lemma="opus">operis</w> <w lemma="primus">primi</w> <w lemma="in">in</w> <w lemma="uncia">uncia</w> <w lemma="unus">una</w>
     <lb n="9"/> <space extent="35" unit="character"/> <g ref="symbols.xml#denarius"/> <w lemma="mille">mille</w>
    <lb n="10"/><note>6</note> <w lemma="opus">Operis</w> <w lemma="secundus">secundi</w> <space extent="12" unit="character"/> <g ref="symbols.xml#denarius"/> <w lemma="septingenti">septingentos</w> <w lemma="quinquaginta">quinquaginta</w>

    <lb n="11"/><note>7</note> <w lemma="barbaricarius">Barbaricari<supplied reason="lost">o</supplied></w> <w lemma="in"><supplied reason="lost">i</supplied>n</w> <w lemma="holosericus">holos<supplied reason="lost">eri</supplied>ca</w> <w lemma="in">in</w> <w lemma="uncia">uncia</w> <w lemma="unus">una</w> <g ref="symbols.xml#denarius"/> <w lemma="quingenti">quingentos</w>
    <lb n="12"/><note>8</note> <w lemma="opus">Operis</w> <w lemma="secundus">secundi</w> <w lemma="in">in</w> <w lemma="uncia">uncia</w> <w lemma="unus">una</w> <g ref="symbols.xml#denarius"/> <w lemma="quadringenti">quadringentos</w>
    <lb n="13"/><note>9</note> <w lemma="sericarius">Sericario</w> <w lemma="in">in</w> <w lemma="subsericus">subserica</w> <w lemma="pastus">pasto</w> <w lemma="diurnus">diurnos</w> <g ref="symbols.xml#denarius"/> <w lemma="uiginti">uiginti</w> <w lemma="quinque">quinque</w>
    <lb n="14"/><note>10</note> <w lemma="in">In</w> <w lemma="holosericus">holoserica</w> <w lemma="purus">pura</w> <w lemma="pastus">pasto</w> <w lemma="diurnus">diurnos</w> <g ref="symbols.xml#denarius"/> <w lemma="uiginti">uiginti</w> <w lemma="quinque">quinque</w>
    <lb n="15"/><note>11</note> <w lemma="in">In</w> <w lemma="holosericus">holoserica</w> <w lemma="scutulatus"><expan><abbr>scut</abbr><ex>u</ex><abbr>lata</abbr></expan></w> <space extent="5" unit="character"/><g ref="symbols.xml#denarius"/> <w lemma="quadraginta">quadraginta</w>
    <lb n="16"/><note>12</note> <w lemma="gerdia">Gerdiae</w> <w lemma="pastus">pastae</w> <w lemma="in">in</w> <w lemma="tunica">tunica</w> <w lemma="pecto">pexa</w> <w lemma="indictio">indictionali</w> <g ref="symbols.xml#denarius"/> <w lemma="duodecim">duodecim</w>
    <lb n="17"/><note>13</note> <w lemma="in">In</w> <w lemma="tunica">tunicis</w> <placeName type="ethnic" nymRef="#Mutinensis" ref="#mutina">Mutinensibus</placeName> <w lemma="uel">uel</w> <w lemma="ceterus">ceteris</w> <w lemma="pastus">pastae</w> <g ref="symbols.xml#denarius"/> <w lemma="sedecim">sedecim</w>
    <lb n="0"/><note>XXI</note>
    <lb n="18"/><note>1a</note> <w lemma="lanarius">Lanario</w> <w lemma="in">in</w> <w lemma="lana">lana</w> <placeName type="ethnic" nymRef="#Mutinensis" ref="#mutina">Mutinensi</placeName> <w lemma="uel">uel</w> <w lemma="marinus">marina</w> <w lemma="pastus">pasto</w> <w lemma="in">in</w> <w lemma="pondus"><expan><abbr>po</abbr><ex>ndum</ex></expan></w> <w lemma="unus">unum</w> <g ref="symbols.xml#denarius"/> <w lemma="quadraginta">qua<lb
       n="19" break="no"/><space extent="35" unit="character"/>draginta</w>
    <lb n="20"/><note>2</note> <w lemma="in">In</w> <w lemma="lana">lana</w> <placeName type="ethnic" nymRef="#Terentinus" ref="#tarentum">Terentina</placeName> <w lemma="uel">uel</w> <placeName type="ethnic" nymRef="#Ladicenus" ref="#laodicea">Ladicena</placeName> <w lemma="uel">uel</w> <placeName type="ethnic" nymRef="#Altinatus" ref="#altinum">Altinata</placeName> <w lemma="in">in</w> <w lemma="pondus"><expan><abbr>po</abbr><ex>ndum</ex></expan></w> <w lemma="unus">unum</w> <g ref="symbols.xml#denarius"/> <w lemma="triginta">tri<lb
       n="21" break="no"/><space extent="35" unit="character"/>ginta</w>
    <lb n="22"/><note>3</note> <w lemma="in">In</w> <w lemma="lana">lana</w> <w lemma="sequor">sequenti</w> <w lemma="in">in</w> <w lemma="pondus"><expan><abbr>po</abbr><ex>ndum</ex></expan></w> <w lemma="unus">unum</w> <g ref="symbols.xml#denarius"/> <w lemma="uiginti">uiginti</w>
    <lb n="23"/><note>4</note> <w lemma="in">In</w> <w lemma="lana">lana</w> <w lemma="grossus">grossa</w> <w lemma="in">in</w> <w lemma="pondus"><expan><abbr>po</abbr><ex>ndum</ex></expan></w> <w lemma="unus">unum</w> <g ref="symbols.xml#denarius"/> <w lemma="quindecim">quindecim</w>
    <lb n="24"/><note>5</note> <w lemma="linteo">Linteoni</w> <w lemma="diurnus">diurnos</w> <w lemma="in">in</w> <w lemma="opus">opere</w> <w lemma="primus">primo</w> <w lemma="pastus"><expan><abbr>past</abbr><ex>o</ex></expan></w> <w lemma="diurnus"><expan><abbr>diurn</abbr><ex>os</ex></expan></w> <g ref="symbols.xml#denarius"/> <w lemma="quadraginta">quadraginta</w>
    <lb n="25"/><note>6</note> <w lemma="in">In</w> <w lemma="opus">opere</w> <w lemma="secundus">secundo</w> <w lemma="pastus">pasto</w> <g ref="symbols.xml#denarius"/> <w lemma="uiginti">uiginti</w>
    <lb n="0"/><note>XXII</note>
    <lb n="26"/><note>1</note> <w lemma="de">De</w> <w lemma="fullo">fullonibus</w>
    <lb n="27"/><note>1a</note> <w lemma="fullo">Fulloni</w> <w lemma="in">in</w> <w lemma="chlamys">chlamyde</w> <w lemma="indictio">indictionali</w> <w lemma="rudis">rudi</w> <space extent="2" unit="character"/><g ref="symbols.xml#denarius"/> <w lemma="quinquaginta">quinquaginta</w>
    <lb n="28"/><note>2</note> <w lemma="in">In</w> <w lemma="strictoria">strictoria</w> <w lemma="indictio">indictionali</w> <w lemma="rudis">rudi</w> <space extent="10" unit="character"/><g ref="symbols.xml#denarius"/> <w lemma="uigintiquinque">uigintiquinque</w>
    <lb n="29"/><note>3</note> <w lemma="in">In</w> <w lemma="asema">asema</w> <w lemma="ex">ex</w> <w lemma="lana">lanis</w> <w lemma="grossus">grossioribus</w> <space extent="10" unit="character"/><g ref="symbols.xml#denarius"/> <w lemma="uiginti">uiginti</w>
    <lb n="30"/><note>4</note> <w lemma="in">In</w> <w lemma="rachana">rachana</w> <w lemma="rudis">rudi</w> <space extent="16" unit="character"/><g ref="symbols.xml#denarius"/> <w lemma="triginta">triginta</w>
    <lb n="31"/><note>5</note> <w lemma="in">In</w> <w lemma="dalmaticomafortium">dalmaticomafortio</w> <w lemma="grossus">grossiori</w> <w lemma="rudis">rudi</w> <space extent="4" unit="character"/> <g ref="symbols.xml#denarius"/> <w lemma="quinquaginta">quinquaginta</w>
    <lb n="32"/><note>6</note> <w lemma="in">In</w> <w lemma="dalmaticomafortium">dalmaticomafortio</w> <w lemma="pecto">pexo</w> <w lemma="tenuis">tenuiori</w> <w lemma="rudis">rudi</w> <space extent="6" unit="character"/><g ref="symbols.xml#denarius"/> <w lemma="centum">centum</w>
    <lb n="33"/><note>7</note> <w lemma="in">In</w> <w lemma="strictoria">strictoria</w> <w lemma="pecto">pexa</w> <w lemma="tenuis">tenui</w> <w lemma="rudis">rudi</w> <space extent="12" unit="character"/><g ref="symbols.xml#denarius"/> <w lemma="quinquaginta">quinquaginta</w>
    <lb n="34"/><note>8</note> <w lemma="in">In</w> <w lemma="dalmatica">dalmatica</w> <w lemma="uirilis">uirili</w> <w lemma="subsericus">subserica</w> <w lemma="rudis">rudi</w> <space extent="6" unit="character"/> <g ref="symbols.xml#denarius"/> <w lemma="ducenti">ducentos</w>
    <lb n="35"/><note>9</note> <w lemma="in">In</w> <w lemma="strictoria">strictoria</w> <w lemma="subsericus">subserica</w> <w lemma="rudis">rudi</w> <space extent="4" unit="character"/> <g ref="symbols.xml#denarius"/> <w lemma="centum">centum</w> <w lemma="septuaginta">septuagin<supplied reason="lost">ta</supplied></w> <supplied reason="lost"><w lemma="quinque">quinque</w></supplied>
    <lb n="36"/><note>10</note> <w lemma="in">In</w> <w lemma="asema">asema</w> <w lemma="subsericus">subserica</w> <w lemma="rudis">rudi</w> <space extent="6" unit="character"/> <g ref="symbols.xml#denarius"/> <w lemma="centum">centum</w> <w lemma="uiginti">ui<supplied reason="lost">ginti</supplied></w> <supplied reason="lost"><w lemma="quinque">quinque</w></supplied>
    <lb n="37"/><note>11</note> <w lemma="in">In</w> <w lemma="dalmaticomafortium">d<supplied reason="lost">almaticomafortio</supplied></w> <supplied reason="lost"> <w lemma="subsericus">subserico</w> <w lemma="rudis">rudi</w> <note>300 denarii</note></supplied>
    <lb n="38"/><note>12</note> <w lemma="in">In</w> <supplied reason="lost"><w lemma="dalmatica">dalmatica</w> <w lemma="holosericus">holoserica</w> <w lemma="uirilis">uirili</w> <w lemma="rudis">rudi</w> <note>400 denarii</note></supplied>
    <lb n="39"/><note>13</note> <w lemma="in">In</w> <w lemma="dalmaticomafortium">d<supplied reason="lost">almaticomafortio</supplied></w> <supplied reason="lost"><w lemma="holosericus">holoserico</w> <w lemma="rudis">rudi</w> <note>600 denarii</note></supplied>
    <lb n="40"/><note>14</note> <w lemma="in">In</w> <w lemma="strictoria">s<supplied reason="lost">trictoria</supplied></w> <supplied reason="lost"><w lemma="holosericus">holoserica</w> <w lemma="rudis">rudi</w> <note>250 denarii</note></supplied>
    <lb n="41"/><note>15</note> <w lemma="in">In</w> <supplied reason="lost"><w lemma="asema">asema</w> <w lemma="holosericus">holoserica</w> <w lemma="rudis">rudi</w> <note>200 denarii</note></supplied>
    <lb n="42"/><note>16</note> <w lemma="in">In</w> <supplied reason="lost"><w lemma="chlamys">chlamyde</w> <placeName type="ethnic" nymRef="#Mutinensis" ref="#mutina">Mutinensi</placeName> <w lemma="duplex">duplici</w> <w lemma="rudis">rudi</w> <note>500 denarii</note></supplied>
    <lb n="43"/><note>17</note> <w lemma="in">In</w> <supplied reason="lost"><w lemma="chlamys">chlamyde</w> <placeName type="ethnic" nymRef="#Mutinensis" ref="#mutina">Mutinensi</placeName> <w lemma="simplex">simplici</w> <w lemma="rudis">rudi</w> <note>250 denarii</note></supplied>
       </ab></div>

    <div subtype="section" type="textpart" n="S">
       <ab>
      <lb n="0"/><note>From Chapter XXIV: Crawford Chapter 54</note>
          <gap reason="lost" extent="unknown" unit="line"/>
    <lb n="1"/> <w lemma="purpura">pur<supplied reason="lost">pura</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="2"/> <w lemma="purpura">pur<supplied reason="lost">pura</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="3"/> <w lemma="purpura"><supplied reason="lost">pu</supplied>r<supplied reason="lost">pura</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <gap reason="lost" extent="unknown" unit="line"/>
    </ab>
                                   </div>

                <div subtype="section" type="textpart" n="Z.f">
       <ab><lb n="0"/><note>From Chapter XXVI: Crawford Chapter 56</note>
          <gap reason="lost" extent="unknown" unit="line"/>
          <lb n="1"/> <space extent="4" unit="character"/><placeName type="ethnic" nymRef="#Tarsicus" ref="#tarsus">Tarsico</placeName> <placeName type="ethnic" nymRef="#Alexandrinus" ref="#alexandria"><unclear>A</unclear><supplied reason="lost">lexandrinarum</supplied></placeName><gap reason="lost" extent="unknown" unit="character"/>
          <lb n="2"/><w lemma="dalmatica">Dalmatic<supplied reason="lost">arum</supplied></w><gap reason="lost" extent="unknown" unit="character"/>
          <gap reason="lost" extent="unknown" unit="line"/>
    </ab></div>
                   <div subtype="section" type="textpart" n="Q">
       <ab><lb n="0"/><note>Chapter XXVIII, lines 45-47: Crawford Chapter 56, lines 240-242</note>
     <gap reason="lost" extent="unknown" unit="line"/>
    <lb n="1"/> <w lemma="forma">forma<supplied reason="lost">e</supplied></w> <supplied reason="lost"><w lemma="tertius">tertiae</w></supplied>
    <lb n="2"/> <w lemma="item">item</w> <w lemma="culcita">culcita</w> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="3"/> <w lemma="mille">mili<supplied reason="lost">bus</supplied></w>
    <lb n="4"/><placeName type="ethnic" nymRef="#Damascenus" ref="#damascus">Damascen<supplied reason="lost">a</supplied></placeName> <gap reason="lost" extent="unknown" unit="character"/>
    <gap reason="lost" extent="unknown" unit="line"/>
    </ab>
    </div>


                <div subtype="section" type="textpart" n="Y">
       <ab><lb n="0"/><note>Chapter XXX, lines 2-4: Crawford Chapter 58</note>
    <lb n="1"/><gap reason="lost" extent="unknown" unit="line"/>
    <lb n="2"/><gap reason="lost" extent="unknown" unit="character"/><supplied reason="lost"><w lemma="pondus"><expan><abbr>po</abbr><ex>ndo</ex></expan></w> <w lemma="unus">unum</w> <g ref="symbols.xml#denarius"/> </supplied><w lemma="septuaginta"><supplied reason="lost">septu</supplied><unclear>agint</unclear><supplied reason="lost">a</supplied></w> <supplied reason="lost"> <w lemma="duo">duobus</w> <w lemma="mille">milibus</w> <space extent="4" unit="character"/></supplied>
    <lb n="3"/><gap reason="lost" extent="unknown" unit="character"/><w part="F">is</w> <w lemma="in">in</w> <w lemma="pondus"><expan><abbr>po</abbr><ex>ndo</ex></expan></w> <w lemma="unus">u<supplied reason="lost">num</supplied></w><supplied reason="lost"> <g ref="symbols.xml#denarius"/> <w lemma="quinque">quinque</w> <w lemma="mille">milibus</w></supplied> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="4"/><supplied reason="lost"><w lemma="auricaesor">Auricaesoribus</w> <w lemma="in">in</w> <w lemma="pondus"><expan><abbr>po</abbr><ex>ndo</ex></expan></w></supplied> <w lemma="unus">unum</w> <g ref="symbols.xml#denarius"/> <supplied reason="lost" cert="low"><w lemma="tres">tria</w> <w lemma="mille">milia</w></supplied> <space extent="4" unit="character"/>
    <gap reason="lost" extent="unknown" unit="line"/>
    </ab>
    </div>

     <div subtype="section" type="textpart" n="T">
       <ab><lb n="0"/><note>Chapter XXXI, lines 1-3: Crawford Chapter 60</note>
     <gap reason="lost" extent="unknown" unit="line"/>
    <lb n="1"/> <w lemma="de">de</w> <w lemma="pretium">pretiis</w> <w lemma="mancipium">m<supplied reason="lost">ancipiorum</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
    <lb n="2"/><w lemma="mancipium">mancipi<supplied reason="lost">um</supplied></w> <supplied reason="lost"><w lemma="rusticus">rusticum</w> <w lemma="siue">siue</w> <w lemma="urbanus">urbanum</w> <w lemma="virilis">virilis</w> <w lemma="sexus">sexus</w></supplied>
    <lb n="3"/><w lemma="ab">ab</w> <w lemma="annus">an<supplied reason="lost">nis</supplied></w> <supplied reason="lost"><w lemma="sedecim">sedecim</w> <w lemma="ad">ad</w> <w lemma="annus">annos</w> <w lemma="quadraginta">quadraginta</w></supplied>
    <lb n="4"/> <space extent="4" unit="character"/>
          <gap reason="lost" extent="unknown" unit="line"/>
    </ab>
    </div>
                                                <div subtype="section" type="textpart" n="U">
       <ab>
          <lb n="0"/><note>Chapter XII: Crawford Chapter 24, lines 9-11</note>
    <lb n="1"/> <space extent="10" unit="character"/> <w lemma="cum">cum</w> <supplied reason="lost"><w lemma="ferrum">ferro</w> <g ref="symbols.xml#denarius"/> <w lemma="quadringenta">quadringentis</w></supplied>
    <lb n="2"/> <space extent="10" unit="character"/> <w lemma="paloredicus">Palo<supplied reason="lost">redica</supplied></w> <supplied reason="lost"><w lemma="sine">sine</w> <w lemma="ferrum">ferro</w> <space extent="unknown"/> <g ref="symbols.xml#denarius"/> <w lemma="decem">decem</w></supplied>
    <lb n="3"/><gap reason="lost" extent="unknown" unit="character"/><w part="F">is</w> <space extent="4" unit="character"/> <w lemma="cum">cum</w> <w lemma="ferrum"><unclear>f</unclear><supplied reason="lost">erro</supplied></w> <space extent="unknown"/> <supplied reason="lost"><g ref="symbols.xml#denarius"/> <w lemma="quinquaginta">quinquaginta</w></supplied>
    <lb n="4"/> <space extent="unknown" unit="character"/>
          <gap reason="lost" extent="unknown" unit="line"/>
    </ab>
    </div>


                   <div subtype="section" type="textpart" n="Z.g">
       <ab>
          <gap reason="lost" extent="unknown" unit="line"/>
        <lb n="1"/><gap reason="lost" extent="unknown" unit="character"/> <w lemma="quinquaginta"><supplied reason="lost">qu</supplied>inqua<supplied reason="lost">ginta</supplied></w> <gap reason="lost" extent="unknown" unit="character"/>
          <lb n="2"/><gap reason="lost" extent="unknown" unit="character"/><w part="F">ginta</w> <space extent="unknown" unit="character"/><gap reason="lost" extent="unknown" unit="character"/>
          <lb n="3"/><gap reason="lost" extent="unknown" unit="character"/><w lemma="mille"><supplied reason="lost" cert="low">milib</supplied>us</w> <w lemma="quingenti"><unclear>q</unclear>u<supplied reason="lost" cert="low">ingentis</supplied></w><gap reason="lost" extent="unknown" unit="character"/>
          <gap reason="lost" extent="unknown" unit="line"/>
    </ab>
    </div>

             </div>




             <div type="translation" xml:space="preserve">
                <div type="translation" resp="#cmr" xml:lang="en"><p>
                <note>Translation taken, with very slight modifications, from Antony Kropff, <ref target="https://www.academia.edu/23644199/New_English_translation_of_the_Price_Edict_of_Diocletianus">New
                   English Translation of the Price Edict of Diocletianus</ref></note></p>
                  <p><note>Part of the Imperial title</note>: The Emperor Caesar Gaius Aurelius Valerius Diocletian], dutiful, blessed, unconquered [Augustus,  . . . ] and the Emperor
        Caesar [Marcus Aurelius Valerius Maximinian . . . l</p>
                   <p><note>Preamble, II.22</note>: . . . ]nourishment [ . . . moderation] may consider [ . . . ] ought to [ . . . </p> <!-- check -->
                   <p><note>Preamble, II.26, and Chapter I,  Pulses and cereals, 14-18</note>: . . . ] they could  mitigate or satisfy. <note>Chapter I, 14</note> [Peas, unshelled] 1 k. mod. 60 <hi rend="italic">denarii</hi>;
                      <note>15</note> [Chick peas] 1 k. mod. 100 <hi rend="italic">denarii</hi>; <note>16</note> [Bitter vetch 1 k. mod.] 100 <hi rend="italic">denarii</hi>;
                      <note>17</note> [Oats 1 k. mod.] 30 [<hi rend="italic">denarii</hi>]; <note>18</note> [Fenugreek 1 k. mod.] 100 [<hi rend="italic">denarii</hi>; . . .</p>
                  <p><note>From Chapter I, Pulses and cereals, lines 21-23</note>: <note>21</note> [Kidney] beans, dried [100 <hi rend="italic">denarii</hi>;] <note>22</note> [Flax]seed [150 <hi rend="italic">denarii</hi>;]
                      <note>23</note> Rice, hulled [ . . . </p>
                   <p><note>Chapter V, Fish, lines 1a-4</note>: . . .  1a Sea fish, not bony, 1 lb,] 24 <hi rend="italic">denarii</hi>;
    <note>2</note> [Sea fish, second quality, 1 lb,] 16 <hi rend="italic">denarii</hi>; <note>3</note> [River fish, first quality, 1 lb,] 12 <hi rend="italic">denarii</hi>;
                      <note>4</note> [River fish, second quality, 1 lb,] 8 <hi rend="italic">denarii</hi>; [ . . . </p>
                  <p><note>Chapter XII, Timber, lines 3-4</note>: . . . <note>3</note> Fir planks, 40 cubits long, 4 cubits in perimeter,] 30.000
                      <hi rend="italic">denarii</hi>; <note>4</note> [Fir planks, 35 cubits long, 80 digiti] in perimeter, [12.000 <hi rend="italic">denarii</hi>; . . .
    </p>
          <p><note>Chapter XV, Wagons, metals etc.: </note>:  . . . ] copper [ . . . ] copper [ . . . ] copper [ . . . ] copper [ . . . </p>
                <p><note>Chapter XIX, Clothing,  lines 11 to 36</note>: <note>11</note> Close fitting strictoria with coloured bands] 6.000 <hi rend="italic">denarii</hi>;
    <note>12</note> [Dalmaticomafor]tium <supplied reason="explanation">hooded wide garment with sleeves</supplied>), part silk, with light purple bands, one pound, 44.000 <hi rend="italic">denarii</hi>;
    <note>13</note> [Dalmat]icomafortium, part silk, part wool from Mutina, with light purple bands, one pound, 46.000 <hi rend="italic">denarii</hi>;
    <note>14</note> [Dalmatic]omafortium, part silk, part ‘sea wool’ <note>wool made from the byssus thread of the Pinna nobilis mussel shell</note> with light purple bands, as above, 48.000 <hi rend="italic">denarii</hi>;
    <note>15</note> Men’s silk [dalmatica]  with dark purple bands, [?one] pound, 50.000 <hi rend="italic">denarii</hi>;
    <note>16</note> Men ’s silk dalmaticomafortium with coloured bands, two pounds, 135.000 <hi rend="italic">denarii</hi>;
    <note>17</note> [ . . ] for incomplete items the same calculation of silk of the value of the dyeing must be made
    <note>18</note> Silk strictoria <supplied reason="explanation">close fitting undershirt with sleeves</supplied>  with purple bands, weighing six unciae, 40.000 <hi rend="italic">denarii</hi>;
    <note>19</note> Silk, [without bands,  . . . ] 45.000 <hi rend="italic">denarii</hi>;
    <note>20</note> . . . ] quality of the  wool [ . . .  and the quantity of the gold thread] and the embroidering may be taken into account
    <note>21</note> [Cloak of wool from Mutin]a, double, purple bands, dyed once …
    <note>22</note> Again cloak [ . . . ]
    <note>23</note> Cloak of wool from Mutina, single, with purple bands... 5 unciae, [ . . .
    <note>24</note> Women’s garment closed with clasps from Mutina,  single, with purple bands, once dyed, [ . . . ] unciae [ . . . ]
    <note>25</note> Women’s garment closed with clasps from Laodicea, of wool from Mutina or Laodicea, single], as above, four unciae, 40[ . . <hi rend="italic">denarii</hi>;
    <note>26</note> Cloak of wool from Mutina or Laodicea, single [ . . . ] unciae, 15.000 <hi rend="italic">denarii</hi>;
    <note>27</note> Women’s garment closed with clasps [ . . . ] with purple bands, first [ . . . ]four unciae 4.000 <hi rend="italic">denarii</hi>;
    <note>28</note> Cover from Britannia, first quality, 5.000 <hi rend="italic">denarii</hi>;
    <note>29</note>   Second quality, 4.000 <hi rend="italic">denarii</hi>;
    <note>30</note> Cover from Cappadocia or Pontica, first quality 3.000 <hi rend="italic">denarii</hi>;
    <note>31</note>   Second quality 2.000 <hi rend="italic">denarii</hi>;
    <note>32</note> [Cover] from Egypt 1.750 <hi rend="italic">denarii</hi>;
    <note>33</note> [Cover from  . . . ] 4.000 <hi rend="italic">denarii</hi>;
    <note>34</note> [Cover from  . . .  for covering a reclining dinner sofa] 4.500 <hi rend="italic">denarii</hi>;
    <note>35</note> [Cover from Africa] 1.500 <hi rend="italic">denarii</hi>;
    <note>36</note> [Covers are to be sold according to the value of the weight of the wool] and the dyeing [ . . .</p>
                   <p><note>XIX, 43-53</note>: ?five denarii [ . . . ], ?twelve <hi rend="italic">denarii</hi>; [ . . . ], 8,000 <hi rend="italic">denarii</hi>; [ . . . ], 10,000 <hi rend="italic">denarii</hi>; [ . . . ],
                      6,000  <hi rend="italic"><hi rend="italic">denarii</hi>;</hi> [ . . . ], 6,000 <hi rend="italic">denarii</hi>; [ . . . </p>
                   <p><note>XIX, 73 - XXII, 17</note>: 73b Dalmaticomafortium from the wool of hares with [purple] bands, one pound, 7.000 <hi rend="italic">denarii</hi>.


    <note>Chapter XX, Clothing workers</note> [For <supplied reason="explanation">wages for</supplied>] embroiderers and silk workers:
    <note>1a</note> [For embroidery] on a close fitting strictoria, part silk, for one uncia of thread [200 <hi rend="italic">denarii</hi>];
    <note>2</note> For embroidery on a close fitting strictoria, pure silk, for one uncia of thread [300 <hi rend="italic">denarii</hi>];
    <note>3</note> For embroidery on a light cloak of wool from Mutina, for one uncia of thread 25 <hi rend="italic">denarii</hi>;
    <note>4</note> For embroidery on a light cloak from Laodiceia, as above, for one uncia of thread 25 <hi rend="italic">denarii</hi>;
    <note>5</note> For a brocade maker, working in gold thread, for work of the best quality, or one uncia of thread 1.000 <hi rend="italic">denarii</hi>;
    <note>6</note>   For work of the second quality, for one uncia of thread 750 <hi rend="italic">denarii</hi>;
    <note>7</note> For a brocade maker, on pure silk, for one uncia of thread 500 <hi rend="italic">denarii</hi>;
     <note>8</note>   For work of second quality, for one uncia of thread 400 <hi rend="italic">denarii</hi>;

    <note>9</note> Silk worker on part silk, with maintenance, for a day 25 <hi rend="italic">denarii</hi>;
    <note>10</note>   On pure silk, with maintenance, for a day 25 <hi rend="italic">denarii</hi>;
                      <note>11</note>  On pure silk, checkered, with maintenance, for a day 40 <hi rend="italic">denarii</hi>;
    <note>12</note> Woman weaver of tunics of soft cloth, according to the indictio <supplied reason="explanation">tax regulations</supplied>, with maintenance, for a day 12 <hi rend="italic">denarii</hi>;
    <note>13</note>    Of tunics of cloth from Mutina and other places,  with maintenance, for a day 16 <hi rend="italic">denarii</hi>;
    <note>Chapter XXI, Wool weavers</note> <note>1</note> For a wool weaver, working in  wool from Mutina or ‘sea wool’  with maintenance, for 1 lb 40 <hi rend="italic">denarii</hi>;
    <note>2</note>    Working in wool from Tarentum, Laodiceia or Altinum, for 1 lb 30 <hi rend="italic">denarii</hi>;
    <note>3</note>    Working in wool of the second quality, for 1 lb 20 <hi rend="italic">denarii</hi>;
    <note>4</note>    Working in wool of the third, coarse quality, for 1 lb 15 <hi rend="italic">denarii</hi>;
    <note>5</note> For a linen weaver for first quality work, with maintenance, for a day 40 <hi rend="italic">denarii</hi>;
    <note>6</note>    For second quality work, with maintenance, for a day 20 <hi rend="italic">denarii</hi>;
    <note>Chapter XXII, Fullers</note>. For <supplied reason="explanation">wages for</supplied> fullers
                      <note>1a</note> Fuller, for a new light cloak, as described in the indictio, 50 <hi rend="italic">denarii</hi>;
    <note>2</note> For a new strictoria as described in the indictio 25 <hi rend="italic">denarii</hi>;
    <note>3</note> For a shirt without decoration, of coarser wool 20 <hi rend="italic">denarii</hi>;
    <note>4</note> For a new cover 30 <hi rend="italic">denarii</hi>;
    <note>5</note> For a new dalmaticomafortium of coarser wool 50 <hi rend="italic">denarii</hi>;
    <note>6</note> For a new dalmaticomafortium of pure soft-finished wool 100 <hi rend="italic">denarii</hi>;
    <note>7</note> For a new strictoria of pure soft-finished wool 50 <hi rend="italic">denarii</hi>;
    <note>8</note> For a man’s new dalmatica, part silk 200 <hi rend="italic">denarii</hi>;
    <note>9</note> For a new strictoria, part silk 175 <hi rend="italic">denarii</hi>;
    <note>10</note> For a new strictoria, part silk, without purple bands 125 <hi rend="italic">denarii</hi>;
    <note>11</note> For [a new dalmaticomafortium, part silk 300 <hi rend="italic">denarii</hi>;]
    <note>12</note> For [a man’s new dalmatica in pure silk 400 <hi rend="italic">denarii</hi>;]
    <note>13</note> For [a new dalmaticomafortium, pure silk 600 <hi rend="italic">denarii</hi>;]
    <note>14</note> For [a new strictoria, pure silk 250 <hi rend="italic">denarii</hi>;]
    <note>15</note> For [a new strictoria, pure silk, without purple bands 200 <hi rend="italic">denarii</hi>;]
    <note>16</note> For [a new light cloak, double, of wool from Mutina 500 <hi rend="italic">denarii</hi>;]
    <note>17</note> For [a new light cloak, single, of wool from Mutina 250 <hi rend="italic">denarii</hi>;]
    </p>

                   <p><note>Chapter XXIV: Purple</note>: . . . ] purple [ . . . ] purple [ . . . ] purple [ . . .  </p>
                   <p><note>From Chapter XXVI, Linen</note>:  . . . ] from Tarsus, Alexandrian [ . . . ] dalmatic <supplied reason="explanation">wide-sleeved tunic</supplied> [ . . . </p>
                  <p><note>Chapter XXVIII, Linens, lines 45-47</note>: <note>45</note> Third quality [1 150 <hi rend="italic">denarii</hi>;] <note>46</note> Bed ticking [and pillow ticking from Tralles or Antinoe 2.750 <hi rend="italic">denarii</hi>;]
                      <note>47</note> From Damascus [ . . . </p>

                   <p><note>Chapter XXX, Gold and silver, lines 2-4</note> <note>2</note>:  . . . Spun gold 1 lb,] 12.000 <hi rend="italic">denarii</hi>;
    <note>3</note> [Goldsmith working in gold,] 1 lb, [5.000 <hi rend="italic">denarii</hi>;
    <note>4</note> [Gold cutters making gold foil,] 1 lb, [10,000] <!-- check --> <hi rend="italic">denarii</hi>; [ . . . </p>
                   <p><note>From Chapter XXXI: Slaves</note>: On the price of slaves. [ . . . ? male] slaves [ . . . ] from the age of [- . . .</p>




                   <p><note>Z.g: Unidentified</note>:  . . . ], fifty [ . . . -]ty [ . . . ] fifty thousand? [ . . .</p>

                </div>
             </div>

             <div type="commentary">
                <head>Commentary</head>
                <p>This text has been greatly enhanced by Benet Salway, drawing on the work of Michael Crawford.</p>
                <p>On section XXXI see <ref target="https://zenon.dainst.org/Record/000882934">Salway (2010)</ref>, 4-5.</p>
             </div>

          </body>
       </text>
    </TEI>
  `;

  const templateDocument = `
    <TEI xmlns="http://www.tei-c.org/ns/1.0" xml:id="P42500" xml:lang="en">
      <teiHeader>
        <fileDesc>
          <titleStmt>
          </titleStmt>
          <publicationStmt>
          </publicationStmt>
          <sourceDesc>
             <msDesc>
                <physDesc>
                   <objectDesc>
                    <supportDesc>
                    </supportDesc>
                   </objectDesc>
                </physDesc>
              </msDesc>
          </sourceDesc>
        </fileDesc>
      </teiHeader>
    </TEI>`

  useEffect(() => {
    // const testString = `
    //   <TEI xmlns="http://www.tei-c.org/ns/1.0" xml:id="P42500" xml:lang="en">
    //     <teiHeader>
    //       <fileDesc>
    //         <titleStmt>
    //           <title>${general.title}</title>
    //           ${general.editors.map((editor, key) => `<editor xml:id="editor-${key}">${editor}</editor>`).join('\n')}
    //         </titleStmt>
    //         <publicationStmt>
    //           <authority>${general.authority}</authority>
    //           <idno type="filename">${general.idNumber}</idno>
    //           ${general.availabilities.length > 0 ?
    //             `<availability>
    //               ${general.availabilities.map((availability) => {
    //                 if(availability !== "") {
    //                   let regExp = /\(([^)]+)\)/;
    //                   let matches = availability.match(regExp);
    //                   let url = matches ? matches[1] : false;
    //                   return `<p>${availability.split('(')[0]} ${url ? `(<ref>${url}</ref>)` : ''}</p>`;
    //                 } else {
    //                   return "";
    //                 }
    //               }).join('\n')}
    //             </availability>`
    //           : ""}
    //         </publicationStmt>
    //         <sourceDesc>
    //            <msDesc>
    //               <msIdentifier>
    //                 <repository ref="institution.xml#db1096">Tolmeita Museum</repository>
    //               </msIdentifier>
    //               <physDesc>
    //                  <objectDesc>
    //                   ${Object.keys(description.sourceData).length > 0 ?
    //                     `<supportDesc>
    //                        <support>
    //                          ${description.sourceData}
    //                        </support>
    //                     </supportDesc>`
    //                    : ''}
    //                 </objectDesc>
    //               </physDesc>
    //             </msDesc>
    //         </sourceDesc>
    //       </fileDesc>
    //     </teiHeader>
    //   </TEI>`


    const formatAvailabilities = (availabilities) => {
      return availabilities.map((availability) => {
        let regExp = /\(([^)]+)\)/;
        let matches = availability.match(regExp);
        let url = matches ? matches[1] : false;
        return `<p>${availability.split('(')[0]} ${url ? `(<ref>${url}</ref>)` : ''}</p>`;
      }).join('\n');
    }

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(templateDocument, "text/xml");

    const dataAndTags = [{
      data : general.title,
      tag : 'title',
      parent : 'titleStmt'
    },{
      data : general.authority,
      tag : 'authority',
      parent : 'publicationStmt'
    },{
      data : general.idNumber,
      tag : 'idno',
      parent : 'publicationStmt',
      atts : ["type|filename"]
    },{
      data : general.availabilities,
      tag : 'availability',
      parent : 'publicationStmt',
      formatting : formatAvailabilities
    },{
      data : description.sourceData,
      tag : 'support',
      parent : 'supportDesc'
    }]

    dataAndTags.forEach(data => {
      if((typeof data.data === 'string' && data.data !== "") || (typeof data.data === 'object' && data.data.length > 0)) {
        const thisElement = xmlDoc.createElement(data.tag);
        if(data.atts) {
          data.atts.forEach(attr => {
            const split = attr.split('|');
            thisElement.setAttribute(split[0], split[1]);
          })
        }
        let innerContent = data.data;
        if(data.formatting) {
          innerContent = data.formatting(data.data);
        }
        thisElement.innerHTML = innerContent;
        xmlDoc.getElementsByTagName(data.parent)[0].appendChild(thisElement);
      }
    })

    // Removing empty nodes
    removeEmptyTagsRecursively($(xmlDoc))

    function removeEmptyTagsRecursively($el) {
      if ($el.children().length) {
          $el.children().each(function(i, val) {
              removeEmptyTagsRecursively($(val));
          });
      } else {
        let nodeContent = $el.html();
        if(nodeContent && nodeContent.trim() === '') {
          let parentNode = $el.parent();
          $el.remove();
          removeEmptyTagsRecursively(parentNode)
        }
      }
    }

    let xmlString = new XMLSerializer().serializeToString(xmlDoc)
    xmlString = xmlString.replace(/xmlns=""/g, "");
    xmlString = xmlString.replace(/xmlns=""/g, "");
    setXMLString(xmlString)
  }, [general, description])

  return (
    <div className="d-flex align-items-end download-container">
      <div className="flex-fill" style={{marginLeft: '10px'}}>
        <div className="d-grid flex-fill gap-2" style={{marginBottom: '10px'}}>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>View XML</Button>
        </div>
        <div className="d-grid flex-fill gap-2">
          <Button variant="light" onClick={() => setModalOpen(true)}>Download XML</Button>
        </div>
      </div>
      <Modal fullscreen={true} show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Body>
          <CodeMirror
            value={hBeautify.html(xmlString)}
            className="xml-height"
            options={{
              mode: 'xml'
            }}
            onChange={(editor, data, value) => {
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default XMLContainer;
