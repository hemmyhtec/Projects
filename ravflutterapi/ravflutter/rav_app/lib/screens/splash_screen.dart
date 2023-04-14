import 'package:flutter/material.dart';
import 'package:rav_app/screens/welcome.dart';

class SplashSceen extends StatefulWidget {
  const SplashSceen({Key? key}) : super(key: key);

  @override
  State<SplashSceen> createState() => _SplashSceenState();
}

class _SplashSceenState extends State<SplashSceen> {
  @override
  void initState() {
    super.initState();
    _navigatetohome();
  }

  _navigatetohome() async {
    await Future.delayed(const Duration(milliseconds: 5000), () {});
    Navigator.pushReplacement(context,
        MaterialPageRoute(builder: (context) => const WelcomeScreen()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height,
      decoration: const BoxDecoration(
        color: Color(0xFF0025B8),
      ),
      child: const Center(
        child: Text(
          "RAV",
          style: TextStyle(
            color: Colors.white,
            fontSize: 36,
            fontFamily: "Montserrat Alternates",
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
    ));
  }
}
